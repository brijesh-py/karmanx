const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const photo = require("./photo");

const tag = sequelize.define("tag", {
  name: DataTypes.STRING,
  photoId: {
    type: DataTypes.INTEGER,
    references: { model: "photos", key: "id" },
  },
});

photo.hasMany(tag, {
  foreignKey: "photoId",
});
tag.belongsTo(photo, {
  foreignKey: "photoId",
});

module.exports = tag;
