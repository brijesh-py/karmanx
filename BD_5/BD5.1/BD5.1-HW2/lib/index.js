const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "database.db",
});

const DataType = sq.DataTypes;
module.exports = { DataType, sequelize };
