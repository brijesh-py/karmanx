const { DataTypes, sequelize } = require("../lib");

const Book = sequelize.define("books", {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  description: DataTypes.TEXT,
  genre: DataTypes.TEXT,
});

module.exports = Book;
