const express = require("express");

const app = express();

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

const getProducts = () => {
  return products;
};

const getProductById = (id) => {
  return products?.find((product) => product?.id === id);
};

const addProduct = (product) => {
  products?.push(product);
  return product;
};

// Exercise 1: Get all products
app.get("/products", (req, res) => {
  res.json(getProducts());
});

// Exercise 2: Get product by ID
app.get("/products/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = getProductById(id);
  if (!product) {
    return res.status(404).json({ message: "No Product found." });
  }
  res.json(product);
});

// Exercise 3: Add new product
app.post("/products/new", (req, res) => {
  const { name, category } = req.body;
  const id = parseInt(req.body?.id);
  const product = addProduct({ id, name, category });
  res.status(201).json(product);
});

module.exports = { app, getProducts, getProductById, addProduct };
