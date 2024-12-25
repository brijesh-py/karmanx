const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const RESPONSE_OK = 200;

// Dummy Data
const recipes = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    chef: "Vikas Khanna",
    prepTimeMinutes: 35,
  },
  {
    id: 2,
    name: "Hyderabadi Dum Biryani",
    cuisine: "Indian",
    chef: "Sanjeev Kapoor",
    prepTimeMinutes: 60,
  },
  {
    id: 3,
    name: "Spaghetti Aglio e Olio",
    cuisine: "Italian",
    chef: "Vikas Khanna",
    prepTimeMinutes: 25,
  },
  {
    id: 4,
    name: "Chole Bhature",
    cuisine: "Indian",
    chef: "Kunal Kapur",
    prepTimeMinutes: 50,
  },
  {
    id: 5,
    name: "Sushi Roll",
    cuisine: "Japanese",
    chef: "Ranveer Brar",
    prepTimeMinutes: 45,
  },
  {
    id: 6,
    name: "Tacos al Pastor",
    cuisine: "Mexican",
    chef: "Nisha Madhulika",
    prepTimeMinutes: 30,
  },
  {
    id: 7,
    name: "Tom Yum Soup",
    cuisine: "Thai",
    chef: "Sanjeev Kapoor",
    prepTimeMinutes: 40,
  },
];

// Controllers
// Task 1.1 - Access Recipe Information
const getRecipeById = (req, res) => {
  const id = parseInt(req.query?.id);
  const recipe = recipes.find((recipe) => recipe.id === id);
  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    recipe,
  });
};

// Task 1.2, 2.2  - Get Recipes by [Property]
const getRecipesByQueryProp = (prop) => {
  return (req, res) => {
    const value = req.query?.[prop]?.toLowerCase();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe[prop]?.toLowerCase() == value
    );
    res.status(RESPONSE_OK).json({ recipes: filteredRecipes });
  };
};

//  Task 1.3 -  Count Recipes by Cuisine
const countRecipesByCuisine = (req, res) => {
  const cuisine = req.query?.cuisine;
  const filteredRecipes = recipes.filter((recipe) => recipe.cuisine == cuisine);
  res.status(RESPONSE_OK).json({ cuisine, count: filteredRecipes.length });
};

// Task 2.1 -  Filter Recipes by Prep Time
const getRecipesByPrepTime = (req, res) => {
  const prepTime = parseInt(req.query?.minutes);
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.prepTimeMinutes <= prepTime
  );
  res.status(RESPONSE_OK).json({ recipes: filteredRecipes });
};

// Task 2.3 - Filter Recipes by Chef Name Length
const getRecipesByChefNameLength = (req, res) => {
  const chefNameLength = parseInt(req.query?.length);
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.chef.length > chefNameLength
  );
  res.status(RESPONSE_OK).json({ recipes: filteredRecipes });
};

// Task 3.1 - Filter Recipes by Cuisine with Route Params
const getRecipesByParamProp = (prop) => {
  return (req, res) => {
    const value = req.params?.[prop];
    const filteredRecipes = recipes.filter((recipe) => recipe[prop] == value);
    res.status(RESPONSE_OK).json({ recipes: filteredRecipes });
  };
};

// Task 3.2 - Filter Recipes by Prep Time with Route Params
const getRecipesByParamPrepTime = (req, res) => {
  const prepTime = parseInt(req.params?.minutes);
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.prepTimeMinutes <= prepTime
  );
  res.status(RESPONSE_OK).json({ recipes: filteredRecipes });
};

// Task 4.1 - Sort Recipes by Prep Time (Ascending)
const sortRecipesByPrepTime = (req, res) => {
  const sortedRecipes = recipes.sort(
    (a, b) => a.prepTimeMinutes - b.prepTimeMinutes
  );
  res.status(RESPONSE_OK).json({ recipes: sortedRecipes });
};

// Task 4.2 - Sort Recipes by Chef Name Length
const sortRecipesByChefNameLength = (req, res) => {
  const sortedRecipes = recipes.sort((a, b) => a.chef.length - b.chef.length);
  res.status(RESPONSE_OK).json({ recipes: sortedRecipes });
};

// Routes
app.get("/recipe-details", getRecipeById);
app.get("/recipes-by-chef", getRecipesByQueryProp("chef"));
app.get("/count-recipes-by-cuisine", countRecipesByCuisine);
app.get("/filter-recipes-by-time", getRecipesByPrepTime);
app.get("/filter-recipes-by-chef-length", getRecipesByChefNameLength);
app.get("/filter-recipes-by-cuisine", getRecipesByQueryProp("cuisine"));
app.get("/recipes/prep-time/:minutes", getRecipesByParamPrepTime);
app.get("/recipes/:cuisine", getRecipesByParamProp("cuisine"));
app.get("/sort-recipes-by-time", sortRecipesByPrepTime);
app.get("/sort-recipes-by-chef-length", sortRecipesByChefNameLength);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
