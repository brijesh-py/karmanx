const express = require("express");

const app = express();

const authors = [
  { authorId: 1, name: "George Orwell", book: "1984" },
  { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
  { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

const getAuthors = () => {
  return authors;
};

const getAuthorById = (id) => {
  return authors?.find((author) => author?.id === id);
};

const addAuthor = (author) => {
  authors?.push(author);
  return author;
};

app.get("/authors", (req, res) => {
  res.json(getAuthors());
});

app.get("/authors/details/:id", (req, res) => {
  const id = req.params.id;
  const author = getAuthorById(id);
  if (!author) {
    return res.status(404).json({ message: "No Author found." });
  }
  res.json(author);
});

app.post("/authors", (req, res) => {
  const { name, book } = req.body;
  const authorId = req.body?.authorId;
  const author = addAuthor({ authorId, name, book });
  req.status(201).json(author);
});

module.exports = { app, getAuthors, getAuthorById, addAuthor };
