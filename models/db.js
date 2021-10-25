//conexão com banco de dados
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postapp", "root", "48241508Kunn", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
