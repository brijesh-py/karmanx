const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const dotenv = require("dotenv");

// Config .ENV
dotenv.config();

// Initialize server
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
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR;
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
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
};

//Config Database
let db;
(async () => {
  db = await open({
    filename: "./movies_database.sqlite",
    driver: sqlite3.Database,
  });
})();

// Controllers
// Exercise 1: Fetch all movies
const getMovies = (req, res) => {
  errorHandler(res, async () => {
    let query = "SELECT * FROM movies";
    let response = await db.all(query, []);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      movies: response,
    });
  });
};

// Exercise 2: Fetch all movies by genre
const getMoviesByGenre = (req, res) => {
  const genre = req.params?.genre;
  errorHandler(res, async () => {
    const query = "SELECT * FROM movies WHERE genre = ?";
    const response = await db.all(query, [genre]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      movies: response,
    });
  });
};

// Exercise 3: Fetch movie details by ID
const getMovieById = (req, res) => {
  const id = req.params?.id;
  errorHandler(res, async () => {
    const query = "SELECT * FROM movies WHERE id = ?";
    const response = await db.all(query, [id]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      movies: response,
    });
  });
};

// Exercise 4: Fetch movie details by release_year
const getMoviesByYear = (req, res) => {
  const year = req.params?.year;
  errorHandler(res, async () => {
    const query = "SELECT * FROM movies WHERE release_year = ?";
    const response = await db.all(query, [year]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      movies: response,
    });
  });
};

// Routes
movieRouter.get("/", getMovies);
movieRouter.get("/genre/:genre", getMoviesByGenre);
movieRouter.get("/details/:id", getMovieById);
movieRouter.get("/release_year/:year", getMoviesByYear);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
