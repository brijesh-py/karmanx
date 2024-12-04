const { DataTypes } = require("sequelize");
const sequelize = require("../lib");

const Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
});

module.exports = Book;
