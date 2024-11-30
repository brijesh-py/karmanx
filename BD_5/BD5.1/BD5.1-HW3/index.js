const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Book = require("./models/book.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
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
    console.log(error);
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

// Dummy Data
const books = [
  {
    title: "The Lost Horizon",
    author: "James Ellison",
    description:
      "A thrilling tale of adventure and discovery in a mysterious mountain range.",
    genre: "Adventure",
  },
  {
    title: "Whispers of the Sea",
    author: "Emily Harper",
    description:
      "A poignant story of love and loss on the shores of a small coastal town.",
    genre: "Romance",
  },
  {
    title: "Shadows in the Forest",
    author: "Michael Turner",
    description:
      "An eerie mystery unfolds in the depths of a secluded woodland.",
    genre: "Mystery",
  },
  {
    title: "Tomorrow's Light",
    author: "Sophia Bennett",
    description:
      "A thought-provoking exploration of humanity in a futuristic world.",
    genre: "Science Fiction",
  },
  {
    title: "Echoes of the Past",
    author: "Liam Carter",
    description:
      "A gripping historical novel following the trials of a family during wartime.",
    genre: "Historical Fiction",
  },
];

// Routes
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(books);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
