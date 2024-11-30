const sq = require("sequelize");
const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
});

const DataTypes = sq.DataTypes;
module.exports = { DataTypes, sequelize };
