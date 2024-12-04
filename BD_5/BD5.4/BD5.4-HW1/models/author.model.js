const { DataTypes, sequelize } = require("../lib");

const Author = sequelize.define("authors", {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER,
});

module.exports = Author;
