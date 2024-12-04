const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const Author = require("./models/author.model");
const Book = require("./models/book.model");
const BookAuthor = require("./models/book-author.model");
const { Op } = require("sequelize");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

//  ROUTERs
const authorRouter = express.Router();
const bookRouter = express.Router();
const bookAuthorRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/book-authors", bookAuthorRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// RESPONSE MESSAGES
const MESSAGES = {
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "Already resource exists",
  BAD_REQUEST: "Invalid request. Please check your input.",
  INTERNAL_SERVER: "An internal server error occurred. Please try again later.",
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
        message: MESSAGES?.INTERNAL_SERVER,
      });
    }
  }
};

// DUMMY DATA
const booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];
const authorsData = [{ name: "J.K Rowling", birthYear: 1965 }];

// CONTROLLERS
// Exercise 1: Create New Author
const createAuthor = (req, res) => {
  const name = req.body?.name;
  const birthYear = parseInt(req.body?.birthYear);
  errorHandler(res, async () => {
    if (!name || !birthYear) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }
    const author = { name, birthYear };
    const newAuthor = await Author.create(author);
    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Author created successfully",
      newAuthor,
    });
  });
};

// Exercise 2: Update Author by ID
const updateAuthor = (req, res) => {
  const name = req.body?.name;
  const birthYear = parseInt(req.body?.birthYear);
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !name || !birthYear) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }

    const isAuthorExist = await Author.findOne({ where: { id } });
    if (!isAuthorExist) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }

    const author = { name, birthYear };
    await Author.update(author, { where: { id } });
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Author updated successfully",
      author: { name, birthYear },
    });
  });
};

// AUTHOR ROUTES
authorRouter.post("/new", createAuthor);
authorRouter.put("/update/:id", updateAuthor);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(booksData);
    await Author.bulkCreate(authorsData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
