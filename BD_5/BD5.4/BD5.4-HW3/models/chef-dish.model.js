const { DataTypes, sequelize } = require("../lib");
const Chef = require("./chef.model");
const Dish = require("./dish.model");

const ChefDish = sequelize.define("chef_dishes", {
  chefId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chef,
      key: "id",
    },
  },
  dishId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Dish,
      key: "id",
    },
  },
});

Chef.belongsToMany(Dish, { through: ChefDish });
Dish.belongsToMany(Chef, { through: ChefDish });

module.exports = ChefDish;
