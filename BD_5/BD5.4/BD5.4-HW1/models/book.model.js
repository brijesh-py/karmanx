const { DataTypes, sequelize } = require("../lib");

const Book = sequelize.define("books", {
  title: DataTypes.STRING,
  genre: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
});

module.exports = Book;
