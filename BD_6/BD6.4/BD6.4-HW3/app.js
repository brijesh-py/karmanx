const express = require("express");
const {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
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

// Exercise 1: Get All Articles
app.get("/articles", (req, res) => {
  errorHandler(res, async () => {
    const articles = await getArticles();
    if (articles?.length == 0 || !articles) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No articles found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(articles);
  });
});

// Exercise 2: Get Article by ID
app.get("/articles/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const article = await getArticleById(id);
    if (!article) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No article found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(article);
  });
});

// Exercise 3: Get All Comments
app.get("/comments", (req, res) => {
  errorHandler(res, async () => {
    const comments = await getComments();
    if (comments?.length == 0 || !comments) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No comments found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(comments);
  });
});

// Exercise 4: Get Genre by ID
app.get("/comments/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const comment = await getCommentById(id);
    if (!comment) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No comment found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(comment);
  });
});

// Exercise 5 : Get User by ID
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
