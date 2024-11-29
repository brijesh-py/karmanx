const { DataTypes, sequelize } = require("../lib");

const Track = sequelize.define("tracks", {
  name: DataTypes.TEXT,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  duration: DataTypes.INTEGER,
});

module.exports = Track;
