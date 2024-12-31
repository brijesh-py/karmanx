const mongoose = require("mongoose");
const recipeCardSchema = new mongoose.Schema(
  {
    recipe_name: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    prepping_time: {
      type: Number,
      required: true,
    },
    cooking_time: {
      type: Number,
      required: true,
    },
    directions: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeCard = mongoose.model("RecipeCard", recipeCardSchema);
module.exports = RecipeCard;
