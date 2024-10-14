import express from "express";
const router = express.Router();
import Produto from "../models/Produto.js";

router.get("/produtos", function (req, res) {
  Produto.findAll().then((produtos) => {
    res.render("produtos", {
      produtos: produtos,
    });
  });
});

router.post("/produtos/new", (req, res) => {
  //recebendo os dados do formulario e gravando nas variaveis
  const nomep = req.body.nomep;
  const preco = req.body.preco;
  const categoria = req.body.categoria;
  Produto.create({
    nomep: nomep,
    preco: preco,
    categoria: categoria,
    //PROMISE (.then)
  }).then(() => {
    res.redirect("/produtos");
  });
});

//Rota de exclusao
//essa rota possui um parametro ID
router.get("/produtos/delete/:id", (req, res) => {
  //coletar o id que veio na url
  const id = req.params.id;
  //metodo para excluir
  Produto.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/produtos/edit/:id", (req, res) => {
  const id = req.params.id;
  Produto.findByPk(id)
    .then((produto) => {
      res.render("produtoEdit", { produto: produto });
    })
    .catch((error) => {
      console.log(error);
    });
});


router.post("/produtos/update", (req, res) => {
  const id = req.body.id;
  const nomep = req.body.nomep;
  const preco = req.body.preco;
  const categoria = req.body.categoria;
  Produto.update(
    {
      nomep: nomep,
      preco: preco,
      categoria: categoria,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;
