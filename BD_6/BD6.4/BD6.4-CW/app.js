const express = require("express");
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require("./db");

const app = express();
app.use(express.json());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
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

// Exercise 1: Get All Books
app.get("/books", (req, res) => {
  errorHandler(res, async () => {
    const books = await getBooks();
    if (books?.length == 0 || !books) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No books found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(books);
  });
});

// Exercise 2: Get Book by ID
app.get("/books/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const book = await getBookById(id);
    if (!book) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No book found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(book);
  });
});

// Exercise 3: Get All Reviews
app.get("/reviews", (req, res) => {
  errorHandler(res, async () => {
    const reviews = await getReviews();
    if (reviews?.length == 0 || !reviews) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No reviews found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(reviews);
  });
});

// Exercise 4: Get Review by ID
app.get("/reviews/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const review = await getReviewById(id);
    if (!review) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No review found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(review);
  });
});

// Exercise 5: Get User by ID
app.get("/users/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const user = await getUserById(id);
    if (!user) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No user found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(user);
  });
});

module.exports = app;
