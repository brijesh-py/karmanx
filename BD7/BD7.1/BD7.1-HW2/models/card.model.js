const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  description: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  connectivity: {
    type: String,
  },
});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
