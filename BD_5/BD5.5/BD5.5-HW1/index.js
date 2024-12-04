const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const User = require("./models/user.model");
const Book = require("./models/book.model");
const Like = require("./models/like.model");
const { Op } = require("sequelize");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
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
    if (process.env.ENV != "development") {
      console.log(error);
    }
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

// DUMMY DATA
const booksData = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

// CONTROLLERS
// Exercise 1: Like a Book
const likeBook = (req, res) => {
  const userId = parseInt(req.params.id);
  const bookId = parseInt(req.query?.bookId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(bookId)) {
      throw new HttpError({
        message: "User id and Book id is expected as a number",
      });
    }

    const isLiked = await Like.findOne({ where: { userId, bookId } });
    if (isLiked) {
      throw new HttpError({ message: "Book already liked" });
    }

    const liked = await Like.create({ userId, bookId });
    if (!liked) {
      throw new HttpError({ message: "User or Book not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Book Liked",
      liked,
    });
  });
};

// Exercise 2: Dislike a Book
const dislikeBook = (req, res) => {
  const userId = parseInt(req.params.id);
  const bookId = parseInt(req.query?.bookId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(bookId)) {
      throw new HttpError({
        message: "User id and Book id is expected as a number",
      });
    }

    const disliked = await Like.destroy({ where: { userId, bookId } });
    if (!disliked) {
      throw new HttpError({ message: "User or Book not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Book disliked",
    });
  });
};

// Exercise 3: Get All Liked Books
const getLikedBooks = (req, res) => {
  const userId = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(userId)) {
      throw new HttpError({ message: "User id is expected as a number" });
    }

    const likes = await Like.findAll({ where: { userId } });
    if (likes?.length == 0 || !likes) {
      throw new HttpError({ message: "No like found" });
    }

    const books = [];
    likes?.forEach((like) => {
      books.push(like.bookId);
    });

    const likedBooks = await Book.findAll({
      where: { id: { [Op.in]: books } },
    });

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      likedBooks,
    });
  });
};

// ROUTES
app.get("/users/:id/like", likeBook);
app.get("/users/:id/dislike", dislikeBook);
app.get("/users/:id/liked", getLikedBooks);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(booksData);
    await User.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });
    await Like.create({ userId: 1, bookId: 1 });

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
