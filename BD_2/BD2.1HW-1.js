const express = require("express");

const app = express();
const PORT = 3000;

// Book router
const bookRouter = express.Router();

// middleware
app.use("/book", bookRouter);

// Book Object
const book = {
  title: "The God of Small Things",
  author: "Arundhati Roy",
  publicationYear: 1997,
  genre: "Novel",
  isAvailable: true,
  stock: 5,
};

// Exercise 1: Return book Object
bookRouter.get("/", (req, res) => {
  res.status(200).json(book);
});

// Exercise 2: Get book name and author
function getBookNameAndAuthor() {
  const fullTitleAndAuthor = book?.title + " by " + book?.author;
  return { fullTitleAndAuthor };
}

bookRouter.get("/fulltitle-author", (req, res) => {
  res.status(200).json(getBookNameAndAuthor());
});

// Exercise 3: Get book genre is available or not
function getBookGenreIsAvailable() {
  const bookGenreIsAvailable = {
    genre: book?.genre,
    isAvailable: book?.isAvailable,
  };
  return bookGenreIsAvailable;
}

bookRouter.get("/genre-availability", (req, res) => {
  res.status(200).json(getBookGenreIsAvailable());
});

// Exercise 4: Get book years of publish
function calculateBookYears() {
  const years = new Date().getFullYear() - book?.publicationYear || 0;
  return { age: years };
}

bookRouter.get("/age", (req, res) => {
  res.status(200).json(calculateBookYears());
});

// Exercise 5: Get book summary
function getBookSummary() {
  const summary = `Title: ${book?.title}, Author: ${book?.author}, Genre: ${book?.genre}, Published: ${book?.publicationYear}`;
  return {summary};
}

bookRouter.get("/summary", (req, res) => {
  res.status(200).json(getBookSummary());
});

// Exercise 6: Get book stock
function getBookStock() {
  if (book?.stock > 0) {
    return { status: "In Stock", stock: book?.stock };
  }
  return { status: "Out of Stock", message: "Order Required" };
}

bookRouter.get("/stock-status", (req, res) => {
  res.status(200).json(getBookStock());
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
