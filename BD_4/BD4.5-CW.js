const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// MOVIE ROUTER
const movieRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/movies", movieRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIG
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./movies1_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

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

// CONTROLLERS
// Exercise 1: Filter Movies by Year and Actor
const getMoviesByYearAndActor = (req, res) => {
  const { releaseYear, actor } = req.query;
  errorHandler(res, async () => {
    if (!releaseYear || !actor) {
      throw new HttpError({ message: "releaseYear and actor query are required" });
    }

    const query = "SELECT * FROM movies WHERE release_year = ? AND actor = ?";
    const movies = await DB?.all(query, [releaseYear, actor]);

    if (movies?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Movies found releaseYear ${releaseYear} by actor ${actor}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Movies fetched successfully",
      movies,
      hits: movies?.length,
    });
  });
};

// Exercise 2: Fetch Award Winning Movies
const getAwardWinningsMovies = (req, res) => {
  const rating = req.query?.rating || "4.5";
  errorHandler(res, async () => {
    const query = `SELECT * FROM movies WHERE rating >= ${rating} ORDER BY rating ASC`;
    const movies = await DB?.all(query, []);

    if (movies?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Movies found, rating ${rating}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Movies fetched successfully",
      movies,
      hits: movies?.length,
    });
  });
};

// Exercise 3: Fetch Blockbuster Movies
const getBlockbusterMovies = (req, res) => {
  const collection = req.query?.collection || "100";
  errorHandler(res, async () => {
    const query = `SELECT * FROM movies WHERE box_office_collection >= ${collection} ORDER BY box_office_collection DESC`;
    const movies = await DB?.all(query, []);

    if (movies?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Movies found, collection ${collection}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Movies fetched successfully",
      movies,
      hits: movies?.length,
    });
  });
};

// ROUTES
movieRouter.get("/year-actor", getMoviesByYearAndActor);
movieRouter.get("/award-winning", getAwardWinningsMovies);
movieRouter.get("/blockbuster", getBlockbusterMovies);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
