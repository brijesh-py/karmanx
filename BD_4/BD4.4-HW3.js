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

// book ROUTER
const bookRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/books", bookRouter);

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
      filename: "./books1_database.sqlite",
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
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
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
        error: error?.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "An unexpected error occurred",
      });
    }
  }
};

// CONTROLLERS
// Exercise 1: Fetch All Books
const getBooks = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT id, title, author FROM books";
    const Books = await DB?.all(query, []);
    if (Books?.length == 0 || !Books) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No Books found",
        error: {
          code: "NOT_FOUND",
          details: "The requested Books not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Books fetched successfully",
      Books,
      hits: Books?.length,
    });
  });
};

// Exercise 2, 3 AND 4: Fetch Books by props
const getBooksByProps = (key, options) => {
  return (req, res) => {
    const value = req.params[key];
    const selectedField = options?.join(", ") || "*";
    errorHandler(res, async () => {
      const query = `SELECT ${selectedField} FROM books WHERE ${key} = ?`;
      const Books = await DB?.all(query, [value]);

      if (Books?.length == 0 || !Books) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No books found",
          error: {
            code: "NOT_FOUND",
            details: "The requested books not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Books fetched successfully",
        Books,
        hits: Books?.length,
      });
    });
  };
};

// ROUTES
bookRouter.get("/", getBooks);
bookRouter.get(
  "/author/:author",
  getBooksByProps("author", ["id", "title", "author", "year"])
);
bookRouter.get(
  "/genre/:genre",
  getBooksByProps("genre", ["id", "title", "author", "genre"])
);
bookRouter.get(
  "/year/:year",
  getBooksByProps("year", ["id", "title", "author", "genre", "year"])
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
