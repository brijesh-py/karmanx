const express = require("express");
const { getBook, getBookById } = require("./controllers");

const app = express();

app.use(express.json());

// Routes
app.get("/books", getBook);
app.get("/books/:id", getBookById);

module.exports = app;
