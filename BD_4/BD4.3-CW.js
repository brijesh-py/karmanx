const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const dotenv = require("dotenv");
const cors = require("cors");

// config .env
dotenv.config();

// initializing server
const app = express();
const PORT = process.env.PORT || 5000;

// Movie Router
const movieRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/movies", movieRouter);

// http status code
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// database config
let db;
(async function () {
  try {
    db = await open({
      filename: "./movies_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// error handling
class HttpError extends Error {
  constructor({ status, message, error }) {
    super(message);
    this.status = status || HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR;
    this.error = error;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message || "Some went wrong!",
        error: error?.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
        error: error?.error,
      });
    }
  }
};

// controllers
// Question 1: Fetch All Movies
const getMovies = (req, res) => {
  errorHandler(res, async () => {
    const query = "SElECT * FROM movies";
    const movies = await db?.all(query, []);
    if (movies.length == 0 || !movies) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No movies found",
        error: {
          code: "NOT_FOUND",
          details: "The requested movies not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Movies fetched successfully",
      movies,
    });
  });
};

// Question 2 and 3: Fetch All Movies by Props
const getMoviesByProps = (prop) => {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECT * FROM movies WHERE ${prop} = ?`;
      const movies = await db?.all(query, [key]);

      if (movies.length == 0 || !movies) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No movies found",
          error: {
            code: "NOT_FOUND",
            details: "The requested movies not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Movies fetched successfully",
        movies,
      });
    });
  };
};

// routes
movieRouter.get("/", getMovies);
movieRouter.get("/actor/:actor", getMoviesByProps("actor"));
movieRouter.get("/director/:director", getMoviesByProps("director"));

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
