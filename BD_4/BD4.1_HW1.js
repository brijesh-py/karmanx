const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const dotenv = require("dotenv");
const cors = require("cors");

// config .env
dotenv.config();

// initialize server
const app = express();
const PORT = process.env.PORT || 500;

// Book Router
const bookRouter = express.Router();

// middlewares
app.use(cors());
app.use("/books", bookRouter);

// constants
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// error handler
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

let db;
// config database
(async () => {
  try {
    db = await open({
      filename: "./books_database.sqlite",
      driver: sqlite3.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// Controllers
// Exercise 1: Fetch All Books
const getBooks = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECt * FROM books";
    const books = await db?.all(query, []);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      books,
    });
  });
};

// Exercise 2: Fetch Books by Author
const getBooksByAuthor = (req, res) => {
  const author = req.params?.author;
  errorHandler(res, async () => {
    const query = "SELECt * FROM books where author = ?";
    const books = await db?.all(query, [author]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      books,
    });
  });
};

// Exercise 3: Fetch Books by Genre
const getBooksByGenre = (req, res) => {
  const genre = req.params?.genre;
  errorHandler(res, async () => {
    const query = "SELECt * FROM books where genre = ?";
    const books = await db?.all(query, [genre]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      books,
    });
  });
};

// Exercise 4: Fetch Books by Publication Year
const getBooksByYear = (req, res) => {
  const year = req.params?.year;
  errorHandler(res, async () => {
    const query = "SELECt * FROM books where publication_year = ?";
    const books = await db?.all(query, [year]);

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      books,
    });
  });
};

// Routes
bookRouter.get("/", getBooks);
bookRouter.get("/author/:author", getBooksByAuthor);
bookRouter.get("/genre/:genre", getBooksByGenre);
bookRouter.get("/publication_year/:year", getBooksByYear);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
