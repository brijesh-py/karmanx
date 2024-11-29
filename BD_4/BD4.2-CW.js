const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const dotenv = require("dotenv");
const cors = require("cors");

// Initializing Server
const app = express();
const PORT = process.env.PORT || 5000;

// Movie Router
const movieRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/movies", movieRouter);

// Constants
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Config Database
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

// Error Handler
class HttpError extends Error {
  constructor({ status, message, error }) {
    super(message);
    this.status = status || HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR;
    this.error = error;
  }
}
async function errorHandler(res, func) {
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
      });
    }
  }
}

// Custom Response
function response({ res, status = HTTPS_STATUS_CODES?.RESPONSE_OK, ...args }) {
  res.status(status).json({
    status,
    ...args,
  });
}

// Controllers
// Exercise 1: Get all movies
function getMovies(req, res) {
  errorHandler(res, async function () {
    const query = "SELECT * FROM movies";
    const movies = await db?.all(query, []);
    if (movies.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No movies not found",
        error: {
          code: "NOT_FOUND",
          details: "The requested movies not found",
        },
      });
    }
    response({ res, message: "Movies fetched successfully", movies });
  });
}

//Exercise 2, 3 and 4: Fetch movies by props
function getMoviesByProps(prop) {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECt * FROM movies WHERE ${prop} = ?`;
      const movies = await db?.all(query, [key]);
      if (movies.length == 0) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No movies not found",
          error: {
            code: "NOT_FOUND",
            details: "The requested movies not found",
          },
        });
      } else {
        response({ res, message: "Movies fetched successfully", movies });
      }
    });
  };
}

// Routes
movieRouter.get("/", getMovies);
movieRouter.get("/genre/:genre", getMoviesByProps("genre"));
movieRouter.get("/details/:id", getMoviesByProps("id"));
movieRouter.get(
  "/release-year/:release_year",
  getMoviesByProps("release_year")
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
