const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// ROUTERS
const restaurantRouter = express.Router();
const dishesRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/restaurants", restaurantRouter);
app.use("/dishes", dishesRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIG
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./restaurants_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

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
      console.log(error);
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// RESPONSE
const responseRestaurant = (res, restaurants) => {
  if (restaurants?.length == 0 || !restaurants) {
    throw new HttpError({ message: "No Restaurants found" });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    message: "Restaurants fetched successfully",
    restaurants,
    hits: restaurants?.length,
  });
};

const responseDishes = (res, dishes) => {
  if (dishes?.length == 0 || !dishes) {
    throw new HttpError({ message: "No Dishes found" });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    message: "Dishes fetched successfully",
    dishes,
    hits: dishes?.length,
  });
};

// CONTROLLERS
// Exercise 1: Get All Restaurants
const getRestaurants = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM restaurants";
    const restaurants = await DB?.all(query, []);
    responseRestaurant(res, restaurants);
  });
};

// Exercise 2 and 3: Get Restaurant by (FIELD)
const getRestaurantByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const query = `SELECT * FROM restaurants WHERE ${key} = ?`;
      const restaurants = await DB?.all(query, value);
      responseRestaurant(res, restaurants);
    });
  };
};

// Exercise 4: Get Restaurants by Filter
const getRestaurantByFilter = (req, res) => {
  const isVeg = req.query?.isVeg;
  const hasOutdoorSeating = req.query?.hasOutdoorSeating;
  const isLuxury = req.query?.isLuxury;

  errorHandler(res, async () => {
    const query =
      "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
    const restaurants = await DB?.all(query, [
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    ]);
    responseRestaurant(res, restaurants);
  });
};

// Exercise 5: Get Restaurants Sorted by Rating
const getRestaurantsSortedByRating = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";
  errorHandler(res, async () => {
    const query = `SELECT * FROM restaurants ORDER BY rating ${
      lowToHigh ? "ASC" : "DESC"
    }`;
    const restaurants = await DB?.all(query, []);
    responseRestaurant(res, restaurants);
  });
};

// Exercise 6: Get All Dishes
const getDishes = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM dishes";
    const dishes = await DB?.all(query, []);
    responseDishes(res, dishes);
  });
};

// Exercise 7: Get Dish by Id
const getDishesById = (req, res) => {
  const id = req.params?.id;
  errorHandler(res, async () => {
    const query = `SELECT * FROM dishes WHERE id = ?`;
    const dishes = await DB?.all(query, [id]);
    responseDishes(res, ...dishes);
  });
};

// Exercise 8: Get Dishes by Filter
const getDishesByFilter = (req, res) => {
  const isVeg = req.query?.isVeg;

  errorHandler(res, async () => {
    const query = "SELECT * FROM dishes WHERE isVeg = ?";
    const dishes = await DB?.all(query, [isVeg]);
    responseDishes(res, dishes);
  });
};

// Exercise 9: Get Dishes Sorted by Price
const getDishesSortedByPrice = (req, res) => {
  const highToLow = req.query?.highToLow == "true";
  errorHandler(res, async () => {
    const query = `SELECT * FROM dishes ORDER BY price ${
      highToLow ? "DESC" : "ASC"
    }`;
    const dishes = await DB?.all(query, []);
    responseDishes(res, dishes);
  });
};

// ROUTES
// RESTAURANTS ROUTES
restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/details/:id", getRestaurantByProps("id"));
restaurantRouter.get("/cuisine/:cuisine", getRestaurantByProps("cuisine"));
restaurantRouter.get("/filter", getRestaurantByFilter);
restaurantRouter.get("/sort-by-rating", getRestaurantsSortedByRating);

// DISHES ROUTES
dishesRouter.get("/", getDishes);
dishesRouter.get("/details/:id", getDishesById);
dishesRouter.get("/filter", getDishesByFilter);
dishesRouter.get("/sort-by-price", getDishesSortedByPrice);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
