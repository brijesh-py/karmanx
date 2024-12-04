const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
});

module.exports = sequelize;
