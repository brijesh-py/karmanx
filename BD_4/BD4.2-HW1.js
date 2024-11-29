const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Config .env file
dotenv.config();

// Initializing server
const app = express();
const PORT = process.env.PORT;

// Book Router
const bookRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/books", bookRouter);

// HTTP STATUS CODE's
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Database config
let db;
(async function () {
  try {
    db = await open({
      filename: "books_database.sqlite",
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
        error: error?.error,
      });
    }
  }
}

// Controllers
// Exercise 1: Fetch All Books
function getBooks(req, res) {
  errorHandler(res, async function () {
    const query = "SELECT * FROM books";
    const books = await db?.all(query, []);
    if (books.length == 0 || !books) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No Books found",
        error: {
          code: "NOT_FOUND",
          details: "The requested books not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Books fetched successfully",
      books,
    });
  });
}

// Exercise 2, 3 and 4: Fetch Books by props
function getBooksByProps(prop) {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async function () {
      const query = `SELECT * FROM books WHERE ${prop} = ?`;
      const books = await db?.all(query, [key]);
      if (books?.length == 0 || !books) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No Books found",
          error: {
            code: "NOT_FOUND",
            details: "The requested books not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Books fetched successfully",
        books,
      });
    });
  };
}

// Routes
bookRouter.get("/", getBooks);
bookRouter.get("/author/:author", getBooksByProps("author"));
bookRouter.get("/genre/:genre", getBooksByProps("genre"));
bookRouter.get(
  "/publication_year/:publication_year",
  getBooksByProps("publication_year")
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
