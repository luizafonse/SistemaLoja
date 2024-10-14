import express from "express";
const app = express();

import connection from "./config/sequelize-config.js";

import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import PedidosController from "./controllers/PedidosController.js";

app.use(express.urlencoded({ extended: false }));

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o Banco bem sucedida");
  })
  .catch((error) => {
    console.log(error);
  });

connection
  .query(`CREATE DATABASE IF NOT EXISTS sisloja;`)
  .then(() => {
    console.log("O banco de dados está criado!");
  })
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static("public"));

app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);

app.get("/", function (req, res) {
  res.render("index");
});

const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
