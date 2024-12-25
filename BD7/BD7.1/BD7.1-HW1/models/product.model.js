const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productPicUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
