const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Post = require("./models/post.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

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
const posts = [
  {
    id: 1,
    name: "John Doe",
    author: "John Doe",
    title: "A Day in the Park",
    content: "Today was sunny, and the park was filled with life and joy.",
  },
  {
    id: 2,
    name: "Jane Smith",
    author: "Jane Smith",
    title: "Tech Innovations",
    content: "Exploring the latest trends in AI and robotics.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    author: "Alex Johnson",
    title: "Cooking Simplified",
    content: "Learn easy recipes that anyone can cook in 30 minutes.",
  },
  {
    id: 4,
    name: "Emma Williams",
    author: "Emma Williams",
    title: "Travel Diaries",
    content: "My adventure through the scenic hills of Tuscany.",
  },
  {
    id: 5,
    name: "Chris Brown",
    author: "Chris Brown",
    title: "Fitness Tips",
    content: "Simple ways to stay healthy and fit with minimal effort.",
  },
];

// Routes
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Post.bulkCreate(posts);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
