const express = require("express");

const app = express();

app.use(express.json());

const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

const getRecipes = () => {
  return recipes;
};

const getRecipeById = (id) => {
  return recipes?.find((recipe) => recipe?.id === id);
};

const addRecipe = (recipe) => {
  recipe.id = recipes?.length + 1;
  recipes?.push(recipe);
  return recipe;
};

// Exercise 1 : Get All Recipes
app.get("/recipes", (req, res) => {
  const recipes = getRecipes();
  res.status(200).json(recipes);
});

// Exercise 2 : Get Recipe by ID
app.get("/recipes/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({ message: "No Recipe found" });
  }
  res.status(200).json(recipe);
});

// Exercise 3 : Add a New Recipe
app.post("/recipes/new", (req, res) => {
  const { name, cuisine, difficulty } = req.body;
  const recipe = addRecipe({ name, cuisine, difficulty });
  res.status(201).json(recipe);
});

module.exports = {
  app,
  getRecipes,
  getRecipeById,
  addRecipe,
};
