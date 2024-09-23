const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/",(req, res) =>{
  res.render("index");
});

app.get("/clientes", (req, res) => {
  const clientes = [
    {
      nome: "Luiz Ricardo Wandenkolk",
      cpf: "123.456.789-09",
      endereco: "Rua Valheim de Bearatriz, Vila Fátima, 123",
    },
    {
      nome: "Lucas Gomes Fagundes",
      cpf: "454.123.565-08",
      endereco: "Rua Figueiredo Lima, Jardim Tupy, 342",
    },
    {
      nome: "Maria Helena",
      cpf: "567.234.456-02",
      endereco: "Rua Figueiredo Lima, Jardim Tupy, 098",
    },
    {
      nome: "Batista Bino de Oliveira",
      cpf: "789.476.234-05",
      endereco: "Rua Glacial Pinheiro, Agrochá, 340",
    },
  ];
  res.render("clientes", {
    //enviando array de objetos:
    clientes: clientes,
  });
});

app.get("/produtos", (req, res) => {
  const produtos = [
    {
      nomeproduto: "Carrozza STX",
      preco: 3400,
      categoria: "Guitarra",
    },
    {
      nomeproduto: "Cisco E-S6",
      preco: 2500,
      categoria: "Teclado",
    },
    {
      nomeproduto: "Tagima E-JS",
      preco: 1850,
      categoria: "Contrabaixo",
    },
    {
      nomeproduto: "Squier Node-MON",
      preco: 8500,
      categoria: "Bateria",
    },
  ];
  res.render("produtos", {
    //enviando array de objetos:
    produtos:produtos,
  });
});

app.get("/pedidos", (req, res) => {
  const pedidos = [
    {
      numpedido: 324212654,
      valor: 3400,
    },
    {
      numpedido: 467821344,
      valor: 2500,
    },
    {
      numpedido: 459686782,
      valor: 1850,
    },
    {
      numpedido: 897568703,
      valor: 8500,
    },
  ];
  res.render("pedidos", {
    //enviando array de objetos:
    pedidos:pedidos,
  });
});


const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
