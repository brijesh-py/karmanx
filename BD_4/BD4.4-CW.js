const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// MOVIES ROUTER
const moviesRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/movies", moviesRouter);

// HTTPS STATUS CODE RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIGURATION
let DB;
(async () => {
  try {
    DB = await open({
      filename: "./movies_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.stack);
    process.exit(1);
  }
})();

// ERROR HANDLING
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred!",
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
  }
}
const errorHandler = async (res, callBack) => {
  try {
    await callBack();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
        error: error?.error || error?.stack,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR || 500).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR || 500,
        message: error?.message || "An unexpected error occurred",
        error: error?.error,
      });
    }
  }
};

// CONTROLLERS
const getMoviesSelectByProps = (prop, options) => {
  return (req, res) => {
    const value = req.params[prop];
    const selectProps = options?.join(", ") || "*";
    const findCol = prop && `WHERE ${prop} = ?`;

    errorHandler(res, async () => {
      const query = `SELECT ${selectProps} FROM movies ${findCol}`;
      const movies = await DB?.all(query, [value]);
      if (!movies) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          message: "Database connections failed",
        });
      }
      if (movies.length == 0) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No Movies found",
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
        hits: movies?.length,
      });
    });
  };
};

// ROUTES
moviesRouter.get(
  "/",
  getMoviesSelectByProps("", ["id", "title", "release_year"])
);
moviesRouter.get(
  "/actor/:actor",
  getMoviesSelectByProps("actor", ["id", "title", "actor", "release_year"])
);
moviesRouter.get(
    "/director/:director",
    getMoviesSelectByProps("director", ["id", "title", "director", "release_year"])
  );

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
