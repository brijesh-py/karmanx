// photo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const photo = sequelize.define("photo", {
  imageUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  altDescription: DataTypes.STRING,
  dateSaved: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
});

photo.associate = (models) => {
  photo.hasMany(models.tag);
};

module.exports = photo;
