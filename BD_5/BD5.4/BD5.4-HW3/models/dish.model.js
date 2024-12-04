const { DataTypes, sequelize } = require("../lib");

const Dish = sequelize.define("dishes", {
  name: DataTypes.STRING,
  cuisine: DataTypes.TEXT,
  preparationTime: DataTypes.INTEGER,
});

module.exports = Dish;
