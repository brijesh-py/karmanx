const { DataTypes, sequelize } = require("../lib");

const Post = sequelize.define("posts", {
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  author: DataTypes.TEXT,
});

module.exports = Post;
