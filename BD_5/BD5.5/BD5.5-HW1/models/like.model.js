const { DataTypes, sequelize } = require("../lib");
const User = require("./user.model");
const Book = require("./book.model");

const Like = sequelize.define("likes", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
});

User.belongsToMany(Book, { through: Like });
Book.belongsToMany(User, { through: Like });

module.exports = Like;
