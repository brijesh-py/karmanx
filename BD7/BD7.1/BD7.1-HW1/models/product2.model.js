const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productPicUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  ratings: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  effectivePixels: {
    type: Number,
    required: true,
  },
  sensorType: {
    type: String,
    required: true,
  },
  isWifi: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String,
    required: true,
  },
  warrantyYear: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  isFeeDelivery: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
