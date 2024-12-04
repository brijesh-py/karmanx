const { DataTypes, sequelize } = require("../lib");

const Movie = sequelize.define("movies", {
  title: DataTypes.TEXT,
  director: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  summary: DataTypes.TEXT,
  year: DataTypes.INTEGER,
});

module.exports = Movie;
