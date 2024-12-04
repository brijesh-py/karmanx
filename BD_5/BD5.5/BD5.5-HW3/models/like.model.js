const { DataTypes, sequelize } = require("../lib");
const User = require("./user.model");
const Recipe = require("./recipe.model");

const Like = sequelize.define("likes", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: "id",
    },
  },
});

User.belongsToMany(Recipe, { through: Like });
Recipe.belongsToMany(User, { through: Like });

module.exports = Like;
