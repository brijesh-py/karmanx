require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

// Config Database
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./travelEase.db",
      driver: sqlite3?.Database,
    });
    console.log("Database connection", DB);
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

// Response
const response = ({ res, status = 200, message = "success", ...data }) => {
  return res.status(status).json({ status, message, ...data });
};

// Controllers
// Exercise 1: Get All Destinations
const getDestinations = async (req, res) => {
  try {
    const query = "SELECT * FROM destinations";
    const destinations = await DB?.all(query);
    response({ res, destinations, hits: destinations?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 2: Get Destination by ID
const getDestinationById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = "SELECT * FROM destinations WHERE id = ?";
    const destination = await DB.all(query, [id]);
    response({ res, destination });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 3: Get Destinations by Type
const getDestinationsByType = async (req, res) => {
  const type = req.params.type;
  try {
    const query = "SELECT * FROM destinations WHERE type = ?";
    const destinations = await DB.all(query, [type]);
    response({ res, destinations, hits: destinations?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 4: Get Destinations by Filters
const getDestinationByProp = async (req, res) => {
  const isPopular = req.query.isPopular;
  const minCost = parseInt(req.query.minCost);
  const maxCost = parseInt(req.query.maxCost);

  try {
    const query =
      "SELECT * FROM destinations WHERE isPopular = ? AND averageCost BETWEEN ? AND ?";
    const destinations = await DB.all(query, [isPopular, minCost, maxCost]);
    response({ res, destinations, hits: destinations?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 5: Get Destinations Sorted by Rating
const sortDestinationByRating = async (req, res) => {
  try {
    const query = "SELECT * FROM destinations ORDER BY rating ASC";
    const destinations = await DB.all(query);
    response({ res, destinations, hits: destinations?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 6: Get All Bookings
const getBookings = async (req, res) => {
  try {
    const query = "SELECT * FROM bookings";
    const bookings = await DB.all(query);
    response({ res, bookings, hits: bookings?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 7: Get Bookings by User
const getBookingsByUser = async (req, res) => {
  const user = req.params.user;
  try {
    const query = `SELECT * FROM bookings WHERE user = ?`;
    const bookings = await DB.all(query, [user]);
    response({ res, bookings, hits: bookings?.length || 0 });
  } catch (error) {
    console.log(error);
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Exercise 8: Get Bookings Sorted by Cost
const sortBookingsByCost = async (req, res) => {
  try {
    const query = "SELECT * FROM bookings ORDER BY cost ASC";
    const bookings = await DB.all(query);
    response({ res, bookings, hits: bookings?.length || 0 });
  } catch (error) {
    response({ res, status: 500, message: "An unexpected error occurred" });
  }
};

// Routes
// Destinations
app.get("/destinations", getDestinations);
app.get("/destinations/details/:id", getDestinationById);
app.get("/destinations/type/:type", getDestinationsByType);
app.get("/destinations/filter", getDestinationByProp);
app.get("/destinations/sort-by-rating", sortDestinationByRating);
// Bookings
app.get("/bookings", getBookings);
app.get("/bookings/user/:user", getBookingsByUser);
app.get("/bookings/sort-by-cost", sortBookingsByCost);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
