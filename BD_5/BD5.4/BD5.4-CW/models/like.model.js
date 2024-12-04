const { DataTypes, sequelize } = require("../lib");
const User = require("./user.model");
const Track = require("./track.model");

const Like = sequelize.define("likes", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: Track,
      key: "id",
    },
  },
});

User.belongsToMany(Track, { through: Like });
Track.belongsToMany(User, { through: Like });
