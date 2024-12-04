const { DataTypes, sequelize } = require("../lib");

const Recipe = sequelize.define("recipes", {
  title: DataTypes.TEXT,
  chef: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  instructions: DataTypes.TEXT,
  preparationTime: DataTypes.INTEGER,
});

module.exports = Recipe;
