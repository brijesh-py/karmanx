const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
const cors = require("cors");

// config .env
dotenv.config();

// initializing server
const app = express();
const PORT = process.env.PORT || 5000;

// recipe router
const recipeRouter = express.Router();

// middlewares
app.use(cors());
app.use("/recipes", recipeRouter);

// https status codes
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// database config
let DB;
(async () => {
  try {
    DB = await open({
      filename: "./recipes_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  } finally {
    if (!DB) {
      console.error("Database connections failed: " + error?.message);
      process.exit(1);
    }
  }
})();

// error handler
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
  }
}
async function errorHandler(res, func) {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error.status,
        message: error.message,
        error: error?.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "An unexpected error occurred",
        error: error?.stack,
      });
    }
  }
}

// controllers
// Exercise 1: Fetch All Recipes by Cuisine
const getRecipesByProps = (prop) => {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECT * FROM recipes WHERE ${prop} = ?`;
      const recipes = await DB?.all(query, [key]);

      if (!recipes) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          message: "Database connections failed",
        });
      }
      if (recipes.length == 0) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No recipes found",
          error: {
            code: "NOT_FOUND",
            details: "The requested recipes not found ",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Recipes fetched successfully",
        recipes,
      });
    });
  };
};

// routes
recipeRouter.get("/cuisine/:cuisine", getRecipesByProps("cuisine"));
recipeRouter.get(
  "/main_ingredient/:main_ingredient",
  getRecipesByProps("main_ingredient")
);
recipeRouter.get(
  "/preparation_time/:preparation_time",
  getRecipesByProps("preparation_time")
);
recipeRouter.get("/difficulty/:difficulty", getRecipesByProps("difficulty"));
recipeRouter.get("/vegetarian/:vegetarian", getRecipesByProps("vegetarian"));


app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
