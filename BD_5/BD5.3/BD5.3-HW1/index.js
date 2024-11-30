const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser());
app.use("/posts", postRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
// RESPONSE MESSAGES
const MESSAGES = {
  FETCH_POSTS: "Posts retrieved successfully.",
  CREATE_POST: "Post created successfully.",
  UPDATE_POST: "Post updated successfully.",
  DELETE_POST: "Post deleted successfully.",
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
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

// RESPONSE
const responsePosts = ({
  res,
  posts,
  status = HTTPS_STATUS_CODES?.RESPONSE_OK,
  message = MESSAGES?.FETCH_POSTS,
}) => {
  if (posts?.length == 0 || !posts) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: MESSAGES?.NOT_FOUND,
    });
  }
  res.status(status).json({
    message,
    status,
    posts,
  });
};

// Dummy Data
const postsData = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginner's guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
  },
];

// CONTROLLERS
// Exercise 1: Fetch all posts
const getPosts = (req, res) => {
  errorHandler(res, async () => {
    const posts = await Post.findAll({ limit: 20 });
    responsePosts({ res, posts });
  });
};

// Exercise 2: Add a new post in the database
const createPost = (req, res) => {
  const { title, content, author } = req.body;
  errorHandler(res, async () => {
    const post = { title, content, author };
    await Post.create(post);
    responsePosts({
      res,
      posts: post,
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: MESSAGES?.CREATE_POST,
    });
  });
};

// Exercise 3: Update post information
const updatePost = (req, res) => {
  const { title, content, author } = req.body;
  const postId = parseInt(req.params.id);

  errorHandler(res, async () => {
    if (isNaN(postId) || !postId) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const post = { title, content, author };
    await Post.update(post, { where: { id: postId } });

    responsePosts({
      res,
      posts: post,
      message: MESSAGES?.UPDATE_POST,
    });
  });
};

// Exercise 4: Delete a post from the database
const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !id) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const post = await Post.destroy({ where: { id } });
    if (post == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: MESSAGES?.DELETE_POST,
    });
  });
};

// ROUTES
postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

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
