import { Sequelize } from "sequelize";

import connection from "../config/sequelize-config.js";

const Produto = connection.define("produtos", {
  nomep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//não forçar a criação da tabela caso ela já exista
Produto.sync({ force: false });
export default Produto;
