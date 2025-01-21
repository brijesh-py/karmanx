let { DataTypes, sequelize } = require("../lib/index");
let Supplier = require("./supplier.model");
let Category = require("./category.model");

let Product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

// Define associations
Product.belongsTo(Supplier, {
  foreignKey: {
    name: "supplierId",
    allowNull: false,
  },
});

Supplier.hasMany(Product, { foreignKey: "supplierId" });

Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });

module.exports = Product;
