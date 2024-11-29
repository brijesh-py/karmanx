const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy Static Data
const books = [
  { title: "Moby Jonas", author: "Herman Melville", publication_year: 2023 },
  { title: "1984", author: "George Orwell", publication_year: 1984 },
  {
    title: "A Tale of Two Cities",
    author: "Charles Jonas",
    publication_year: 2000,
  },
];
const employees = [
  { name: "John", salary: 75000 },
  { name: "Jane", salary: 50000 },
  { name: "Doe", salary: 30000 },
];
const products = [
  { name: "Product A", price: 10 },
  { name: "Product B", price: 15 },
  { name: "Product C", price: 25 },
];
const movies = [
  { title: "Movie A", rating: 9.0 },
  { title: "Movie C", rating: 7.0 },
  { title: "Movie B", rating: 8.5 },
];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedBooksByPages(books, isAscend = true) {
  if (isAscend) {
    return structuredClone(books).sort(
      (book1, book2) => book1?.publication_year - book2?.publication_year
    );
  }
  return structuredClone(books).sort(
    (book1, book2) => book2?.publication_year - book1?.publication_year
  );
}

function getSortedEmployeesBySalary(employees, isAscend = true) {
  if (isAscend) {
    return structuredClone(employees).sort((e1, e2) => e1 - e2);
  }
  return structuredClone(employees).sort((e1, e2) => e2 - e1);
}

function getSortedProductsByPrice(products, isAscend = true) {
  if (isAscend) {
    return structuredClone(products).sort((p1, p2) => p1?.price - p2?.price);
  }
  return structuredClone(products).sort((p1, p2) => p2?.price - p1?.price);
}

function getSortedMoviesByRating(movies, isAscend = true) {
  if (isAscend) {
    return structuredClone(movies).sort((m1, m2) => m1?.rating - m2?.rating);
  }
  return structuredClone(movies).sort((m1, m2) => m2?.rating - m1?.rating);
}

// Routes
// Exercise 1: Sort Books by Year in ascending order
app.get("/books/sort-by-year", (req, res) => {
  try {
    const sortedBooks = getSortedBooksByPages(books);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      books: sortedBooks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Exercise 2: Sort Employees by Salary in Descending Order
app.get("/employees/sort-by-salary", (req, res) => {
  try {
    const sortedEmployees = getSortedEmployeesBySalary(employees, false);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      employees: sortedEmployees,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Exercise 3: Sort Products by Price in Ascending Order
app.get("/products/sort-by-price", (req, res) => {
  try {
    const sortedProducts = getSortedProductsByPrice(products);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Exercise 4: Sort Movies by Rating in Descending Order
app.get("/movies/sort-by-rating", (req, res) => {
  try {
    const sortedMovies = getSortedMoviesByRating(movies, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      movies: sortedMovies,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
