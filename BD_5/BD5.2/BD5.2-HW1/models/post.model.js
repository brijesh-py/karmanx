const { DataTypes, sequelize } = require("../lib");

const Post = sequelize.define("posts", {
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
});

module.exports = Post;
