require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Supplier = require("./models/supplier.model");
const Category = require("./models/category.model");
const Product = require("./models/product.model");

const app = express();
const PORT = process.env.PORT ?? 5000;

// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());

// Default Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Inventory Management System API!");
});

// Exercise 1: Create a New Supplier (POST )
const createSupplier = async (req, res) => {
  const { name, contact, email, phone } = req.body.newSupplier;
  try {
    const supplier = await Supplier.create({ name, contact, email, phone });
    res.status(201).json({ status: 201, newSupplier: supplier?.toJSON() });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Exercise 2: Create a New Product (POST )
const createProduct = async (req, res) => {
  const { name, description, quantityInStock, price, supplierId } =
    req.body.newProduct;
  try {
    const product = await Product.create({
      name,
      description,
      quantityInStock,
      price,
      supplierId,
    });
    res.status(201).json({ status: 201, newProduct: product?.toJSON() });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Exercise 3: Create a New Category(POST)
const createCategory = async (req, res) => {
  const { name, description } = req.body.newCategory;
  try {
    const category = await Product.create({
      name,
      description,
    });
    res.status(201).json({ status: 201, newCategory: category?.toJSON() });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Exercise 5: Get All Products by Category(GET)
const getProducts = async (req, res) => {
  const categoryId = req.params?.categoryId;
  try {
    const products = await Product.findAll({
      include: [{}],
    });
    res.status(200).json({ status: 200, products });
  } catch (error) {
    res
      .status(500)
      .json({ message: error?.message ?? "An unexpected error occurred" });
  }
};

// Routes
app.get("/categories/:categoryId/products", getProducts);

// Seed Data
app.get("/seed_db", async (req, res) => {
  //Given Data
  const suppliersData = [
    {
      name: "TechSupplies",
      contact: "John Doe",
      email: "contact@techsupplies.com",
      phone: "123-456-7890",
    },
    {
      name: "HomeGoods Co.",
      contact: "Jane Smith",
      email: "contact@homegoodsco.com",
      phone: "987-654-3210",
    },
  ];

  const productsData = [
    {
      name: "Laptop",
      description: "High-performance laptop",
      quantityInStock: 50,
      price: 120099,
      supplierId: 1,
    },
    {
      name: "Coffee Maker",
      description: "12-cup coffee maker",
      quantityInStock: 20,
      price: 45000,
      supplierId: 2,
    },
  ];

  const categoriesData = [
    { name: "Electronics", description: "Devices and gadgets" },
    {
      name: "Kitchen Appliances",
      description: "Essential home appliances for kitchen",
    },
  ];
  //   sequelize.sync({ force: true });
  await Supplier.bulkCreate(suppliersData);
  await Category.bulkCreate(categoriesData);
  await Product.bulkCreate(productsData);
  res.send("Successfully Data Inserted");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
