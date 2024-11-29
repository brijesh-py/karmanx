const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Server side constants  dummy data
const products = [
  { name: "Laptop", price: 50000, category: "Electronics" },
  { name: "Mobile", price: 20000, category: "Electronics" },
  { name: "Shirt", price: 1500, category: "Apparel" },
  { name: "Mixer Grinder", price: 4000, category: "Home Appliances" },
];
const cars = [
  { make: "Maruti", model: "Swift", mileage: 15000 },
  { make: "Hyundai", model: "i20", mileage: 25000 },
  { make: "Tata", model: "Nexon", mileage: 30000 },
];
const movies = [
  { title: "3 Idiots", genre: "Comedy", rating: 9 },
  { title: "Dangal", genre: "Drama", rating: 10 },
  { title: "Bahubali", genre: "Action", rating: 8 },
];
const orders = [
  { orderId: 1, customerName: "Rahul", status: "shipped" },
  { orderId: 2, customerName: "Sita", status: "pending" },
  { orderId: 3, customerName: "Amit", status: "shipped" },
];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status: status,
    success: false,
    message: error || "Internal server error",
  });
}

function filterByCategory(products, category) {
  const filteredProducts = products.filter(
    (product) => product?.category === category && product
  );
  return filteredProducts;
}

function filterByMileage(cars, mileage) {
  const filteredCars = cars.filter((car) => car?.mileage < mileage && car);
  return filteredCars;
}

function filterByRating(movies, minRating) {
  const filteredMovies = movies.filter((movie) => movie?.rating > minRating);
  return filteredMovies;
}

function filterByStatus(orders, status) {
  const filteredOrders = orders.filter(
    (order) => order?.status === status && order
  );
  return filteredOrders;
}

// routes
// Question 1: Filter Products by Category
app.get("/products/category/:category", (req, res) => {
  const category = req.params?.category;
  try {
    const filteredProducts = filterByCategory(products, category);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: filteredProducts,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 2: Filter Cars by Mileage
app.get("/cars/mileage/:maxMileage", (req, res) => {
  const mileage = req.params?.maxMileage;
  try {
    const lowestMileageCars = filterByMileage(cars, mileage);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      cars: lowestMileageCars,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 3: Filter Movies by Rating
app.get("/movies/rating/:minRating", (req, res) => {
  const minRating = req.params?.minRating;
  try {
    const filteredMovies = filterByRating(movies, minRating);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      movies: filteredMovies,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 4: Filter Orders by Status
app.get("/orders/status/:status", (req, res) => {
  const status = req.params?.status;
  try {
    const filteredOrders = filterByStatus(orders, status);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      orders: filteredOrders,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
