const { DataTypes, sequelize } = require("../lib");
const Author = require("./author.model");
const Book = require("./book.model");

const BookAuthor = sequelize.define("book_authors", {
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Author,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
});

Author.belongsToMany(Book, { through: BookAuthor });
Book.belongsToMany(Author, { through: BookAuthor });

module.exports = BookAuthor;
