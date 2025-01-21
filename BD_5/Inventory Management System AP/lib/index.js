const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./inventory.db",
});

module.exports = { sequelize, DataTypes: sq.DataTypes };
