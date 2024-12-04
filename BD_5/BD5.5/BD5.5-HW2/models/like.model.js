const { DataTypes, sequelize } = require("../lib");
const User = require("./user.model");
const Movie = require("./movie.model");

const Like = sequelize.define("likes", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie,
      key: "id",
    },
  },
});

User.belongsToMany(Movie, { through: Like });
Movie.belongsToMany(User, { through: Like });

module.exports = Like;
