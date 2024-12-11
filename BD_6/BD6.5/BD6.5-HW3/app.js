const express = require("express");
const { addArticle, addAuthor } = require("./controllers");

const app = express();

app.use(express.json());

// Validate Input Middleware
const validateInput = (queries) => {
  return (req, res, next) => {
    let invalidQuery;
    for (const query in queries) {
      const arr = queries[query];
      const key = req.body[arr[0]];

      if (!key || typeof key !== (arr[1] || "string") || key?.length < arr[2]) {
        invalidQuery = arr;
      }
    }
    if (invalidQuery) {
      const lengthMessage = invalidQuery[2]
        ? ` with a length of at least ${invalidQuery[2]}`
        : "";
      res.status(400).json({
        status: 400,
        message: `${invalidQuery[0]} is required and should be a ${invalidQuery[1] || "string"}${lengthMessage}`,
      });
    }
    next();
  };
};

// Routes
app.post("/api/articles/", validateInput([["title"], ["content"]]), addArticle);
app.post(
  "/api/authors/",
  validateInput([["name"], ["articleId", "number"]]),
  addAuthor
);

module.exports = app;
