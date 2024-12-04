const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const User = require("./models/user.model");
const Recipe = require("./models/recipe.model");
const Like = require("./models/like.model");
const { Op } = require("sequelize");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// ERROR HANDLING
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
  }) {
    super(message);
    this.status = status;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (process.env.ENV != "development") {
      console.log(error);
    }
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// DUMMY DATA
const recipesData = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

// CONTROLLERS
// Exercise 1: Like a Recipe
const likeRecipe = (req, res) => {
  const userId = parseInt(req.params.id);
  const recipeId = parseInt(req.query?.recipeId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(recipeId)) {
      throw new HttpError({
        message: "User id and Recipe id is expected as a number",
      });
    }

    const isLiked = await Like.findOne({ where: { userId, recipeId } });
    if (isLiked) {
      throw new HttpError({ message: "Recipe already liked" });
    }

    const liked = await Like.create({ userId, recipeId });
    if (!liked) {
      throw new HttpError({ message: "User or Recipe not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Recipe Liked",
      liked,
    });
  });
};

// Exercise 2: Dislike a Recipe
const dislikeRecipe = (req, res) => {
  const userId = parseInt(req.params.id);
  const recipeId = parseInt(req.query?.recipeId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(recipeId)) {
      throw new HttpError({
        message: "User id and Recipe id is expected as a number",
      });
    }

    const disliked = await Like.destroy({ where: { userId, recipeId } });
    if (!disliked) {
      throw new HttpError({ message: "User or Recipe not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Recipe disliked",
    });
  });
};

// Exercise 3: Get All Liked Recipes
const getLikedRecipes = (req, res) => {
  const userId = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(userId)) {
      throw new HttpError({ message: "User id is expected as a number" });
    }

    const likes = await Like.findAll({ where: { userId } });
    if (likes?.length == 0 || !likes) {
      throw new HttpError({ message: "No like found" });
    }

    const recipes = [];
    likes?.forEach((like) => {
      recipes.push(like.recipeId);
    });

    const likedRecipes = await Recipe.findAll({
      where: { id: { [Op.in]: recipes } },
    });

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      likedRecipes,
    });
  });
};

// ROUTES
app.get("/users/:id/like", likeRecipe);
app.get("/users/:id/dislike", dislikeRecipe);
app.get("/users/:id/liked", getLikedRecipes);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Recipe.bulkCreate(recipesData);
    await User.create({
      username: "foodlover",
      email: "foodlover@gmail.com",
      password: "password123",
    });
    await Like.create({ userId: 1, recipeId: 1 });

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
