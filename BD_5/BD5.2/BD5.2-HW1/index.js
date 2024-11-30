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

// POST ROUTER
const postRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/posts", postRouter);

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

// RESPONSE
const responsePosts = (res, posts) => {
  if (posts?.length == 0 || !posts) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No posts found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    posts,
  });
};

// Dummy Data
const postsData = [
  {
    name: "John Doe",
    author: "John Doe",
    title: "A Day in the Park",
    content: "Today was sunny, and the park was filled with life and joy.",
  },
  {
    name: "Jane Smith",
    author: "Jane Smith",
    title: "Tech Innovations",
    content: "Exploring the latest trends in AI and robotics.",
  },
  {
    name: "Alex Johnson",
    author: "Alex Johnson",
    title: "Cooking Simplified",
    content: "Learn easy recipes that anyone can cook in 30 minutes.",
  },
  {
    name: "Emma Williams",
    author: "Emma Williams",
    title: "Travel Diaries",
    content: "My adventure through the scenic hills of Tuscany.",
  },
  {
    name: "Chris Brown",
    author: "Chris Brown",
    title: "Fitness Tips",
    content: "Simple ways to stay healthy and fit with minimal effort.",
  },
];

// CONTROLLERS
// Exercise 1: Fetch all posts
const getPosts = (req, res) => {
  errorHandler(res, async () => {
    const posts = await Post.findAll();
    responsePosts(res, posts);
  });
};

// Exercise 2: Fetch post details by ID
const getPostById = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const post = await Post.findAll({ where: { id } });
    responsePosts(res, ...post);
  });
};

// Exercise 3: Fetch posts by (PROP)
const getPostsByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const posts = await Post.findAll({
        where: { [key]: value },
      });
      responsePosts(res, posts);
    });
  };
};

// Exercise 4: Sort all the posts by (PROP)
const getSortedPostsByProps = (key) => {
  return (req, res) => {
    const reKey = key?.replace("-", "_");
    const order = req.query?.order == "asc" ? "asc" : "desc";
    errorHandler(res, async () => {
      const posts = await Post.findAll({
        order: [[reKey, order]],
      });
      responsePosts(res, posts);
    });
  };
};

// ROUTES
postRouter.get("/", getPosts);
postRouter.get("/details/:id", getPostById);
postRouter.get("/author/:author", getPostsByProps("author"));
postRouter.get("/sort/:name", getSortedPostsByProps("name"));

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Post.bulkCreate(postsData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
