const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Post = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = Post;
