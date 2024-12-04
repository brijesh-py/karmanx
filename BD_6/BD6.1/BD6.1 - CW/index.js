const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Book = require("./models/book.model");
const sequelize = require("./lib");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser());

// Utils
const getBooks = async () => {
  const books = await Book.findAll();
  return books;
};

const getBookById = async (id) => {
  const book = await Book.findOne({ where: { id } });
  return book;
};

const createBook = async (book) => {
  const isCreated = await Book.create(book);
  return isCreated;
};

// Controllers
// Exercise 1: Get all books
app.get("/api/books", async (req, res) => {
  const books = await getBooks();
  res.status(200).json({ status: 200, books });
});

// Exercise 2: Get book by ID
app.get("/api/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  res.status(200).json({
    status: 200,
    book,
  });
});

// Exercise 3: Add new book
app.post("/api/books", async (req, res) => {
  const { title, author } = req.body;
  const isCreated = await createBook({ title, author });
  if (!isCreated) {
    return res.status(404).json({
      status: 404,
      message: "Book not created",
    });
  }
  res.status(201).json({
    status: 201,
    message: "Book created successfully",
  });
});

// Seed Data
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });
  await Book.bulkCreate([
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);
  res
    .status(200)
    .json({ status: 200, message: "Database seeding successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
