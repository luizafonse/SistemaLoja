const express = require("express");
const app = express();
console.log("penis");


app.get("/", function(req,res){
    res.send("<h1>Bem vindo </h1>")
})
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
