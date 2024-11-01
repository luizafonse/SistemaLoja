import express from "express";
import User from "../models/User.js";
const router = express.Router();
//importando bcrypt
import bcrypt from "bcrypt";
//Rota de login
router.get("/login", (req, res) => {
  res.render("login", {
    loggedOut: true,
    messages: req.flash(),
  });
});
//rota de logout
router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
});

//Rota de cadastro
router.get("/cadastro", (req, res) => {
  res.render("cadastro",{
  loggedOut: true,
    messages: req.flash(),
  });
});

//Rota de criação de usuário

router.post("/createUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //verificar se o usuario ja esta cadastrado
  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      //aqui é feito o cadastro e o hash de senha
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        email: email,
        password: hash,
      }).then(() => {
        res.redirect("/login");
      });
      //caso o usuario ja esteja cadastrado
    } else {
      req.flash(
        "danger",
        "O usuário informado já esta cadastrado. Faça o login."
      );
      res.redirect("/cadastro");
    }
  });
});

//ROTA DE AUTENTICAÇÂO
router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //busca usuario no banco
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    //se o usuario estiver cadastrado
    if (user != undefined) {
      //valida a senha (verifica a hash)
      const correct = bcrypt.compareSync(password, user.password);
      //se a senha for valida
      if (correct) {
        //autoriza o login
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        // res.send(`Usuário logado:<br> ID: ${req.session.user["id"]}<br>
        //   E-mail: ${req.session.user["email"]}`);
        //enviar uma mensagem de sucesso
        req.flash("success", "Login efetuado com sucesso.");
        res.redirect("/");
        //se a senha não for valida
      } else {
        req.flash("danger", "A senha está incorreta. Tente novamente.");
        res.redirect("/login");
      }
    } else {
      //se p usuário não existe
      req.flash(
        "danger",
        "O usuário informado não existe. Verifique os dados."
      );
      res.redirect("/login");
    }
  });
});

export default router;
