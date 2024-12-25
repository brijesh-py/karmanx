const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const user = require("./user");

const searchHistory = sequelize.define("searchHistory", {
  query: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
    references: { model: "users", key: "id" },
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

user.hasMany(searchHistory, {
  foreignKey: "userId",
});
searchHistory.belongsTo(user, {
  foreignKey: "userId",
});

module.exports = searchHistory;
