const { DataTypes, sequelize } = require("../lib");

const Chef = sequelize.define("chefs", {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER,
});

module.exports = Chef;
