const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getProducts, getProductById, addProduct } = require("./product");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser());

// Controllers
// Exercise 1: Get all Products
app.get("/products", (req, res) => {
  const products = getProducts();
  res.status(200).json({
    status: 200,
    products,
  });
});

// Exercise 2: Get Product by ID
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = getProductById(id);
  res.status(200).json({
    status: 200,
    product,
  });
});

// Exercise 3: Add new Product
app.post("/products/", (req, res) => {
  const { name, category } = req.body;
  const product = addProduct({ name, category });
  res.status(201).json({
    status: 201,
    product,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
