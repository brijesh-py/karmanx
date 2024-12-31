require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.connect");
const Recipe = require("./models/recipe.model");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

// Add New Recipe
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Recipes By Prop
const getRecipesByProp = (prop) => {
  return async (req, res) => {
    try {
      const value = req.params[prop];
      const recipes = await Recipe.find({ [prop]: value });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Update Recipe by Prop
const updateRecipeByProp = (prop) => {
  return async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { [prop]: req.params[prop] },
        req.body,
        { new: true }
      );
      console.log(updatedRecipe);
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Delete Recipe
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/:title", getRecipesByProp("title"));
app.get("/recipes/author/:author", getRecipesByProp("author"));
app.get("/recipes/difficulty/:difficulty", getRecipesByProp("difficulty"));
app.put("/recipes/:id", updateRecipeByProp("id"));
app.put("/recipes/title/:title", updateRecipeByProp("title"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
