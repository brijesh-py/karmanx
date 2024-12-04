const { DataTypes, sequelize } = require("../lib");

const Book = sequelize.define("books", {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  summary: DataTypes.TEXT,
  year: DataTypes.INTEGER,
});

module.exports = Book;
