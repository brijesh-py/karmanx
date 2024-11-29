const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy Data
const products = [
  { name: "Product A", inStock: true },
  { name: "Product B", inStock: false },
  { name: "Product C", inStock: true },
  { name: "Product D", inStock: false },
];
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 17 },
  { name: "Dave", age: 16 },
];
const productsPrice = [
  { name: "Product A", price: 50 },
  { name: "Product B", price: 150 },
  { name: "Product C", price: 200 },
  { name: "Product D", price: 90 },
];
const articles = [
  { title: "Article A", wordCount: 400 },
  { title: "Article B", wordCount: 600 },
  { title: "Article C", wordCount: 700 },
  { title: "Article D", wordCount: 300 },
];
const movies = [
  { title: "Movie A", rating: 8.5 },
  { title: "Movie B", rating: 7.0 },
  { title: "Movie C", rating: 9.0 },
  { title: "Movie D", rating: 6.5 },
];
const employees = [
  { name: "Employee A", experience: 3 },
  { name: "Employee B", experience: 6 },
  { name: "Employee C", experience: 10 },
  { name: "Employee D", experience: 2 },
];

// Utility functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status: status,
    success: false,
    message: error || "Internal server error",
  });
}

function filterInStockProducts(products, inStock = true) {
  const filteredProducts = products.filter(
    (product) => product?.inStock === inStock
  );
  return filteredProducts;
}

function filterAdults(users, age = 18) {
  const filteredUser = users.filter((user) => user?.age > age);
  return filteredUser;
}

function filterExpensiveProducts(productsPrice, price) {
  const filteredProducts = productsPrice.filter(
    (product) => product?.price > price
  );
  return filteredProducts;
}

function filterLongArticles(articles, minWords) {
  const filteredArticles = articles.filter(
    (article) => article?.wordCount > minWords
  );
  return filteredArticles;
}

function filterHighRatedMovies(movies, rating) {
  const filteredMovies = movies.filter((movie) => movie?.rating > rating);
  return filteredMovies;
}

function filterExperiencedEmployees(employees, years) {
  const filteredEmployees = employees.filter(
    (employee) => employee?.experience > years
  );
  return filteredEmployees;
}

// routes
// Exercise 1: Filter In-Stock Products
app.get("/in-stock-products", (req, res) => {
  try {
    const filteredProducts = filterInStockProducts(products);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: filteredProducts,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

// Exercise 2: Filter Adults from User List
app.get("/adult-users", (req, res) => {
  try {
    const filteredUser = filterAdults(users);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      users: filteredUser,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

// Exercise 3: Filter Expensive Products
app.get("/expensive-products", (req, res) => {
  const price = parseFloat(req.query?.price);
  try {
    const filteredProducts = filterExpensiveProducts(productsPrice, price);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: filteredProducts,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

// Exercise 4: Filter Articles by Word Count
app.get("/long-articles", (req, res) => {
  const minWords = parseInt(req.query?.minWords);
  try {
    const filteredArticles = filterLongArticles(articles, minWords);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      articles: filteredArticles,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

// Exercise 5: Filter Movies by Rating
app.get("/high-rated-movies", (req, res) => {
  const rating = parseFloat(req.query?.rating);
  try {
    const filteredMovies = filterHighRatedMovies(movies, rating);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      movies: filteredMovies,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

// Exercise 6: Filter Employees by Experience
app.get("/experienced-employees", (req, res) => {
  const years = parseFloat(req.query?.years);
  try {
    const filteredEmployees = filterExperiencedEmployees(employees, years);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      employees: filteredEmployees,
    });
  } catch (error) {
    errorResponse({ res, error:error?.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
