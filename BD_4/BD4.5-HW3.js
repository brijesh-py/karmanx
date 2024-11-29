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

// KITCHEN ROUTER
const kitchenRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/kitchen-items", kitchenRouter);

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
      filename: "./kitchen_database.sqlite",
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
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// CONTROLLERS
// Exercise 1: Fetch Kitchen Items by Minimum Rating
const getKitchenItemsByRating = (req, res) => {
  const minRating = req.query?.minRating || "0";
  errorHandler(res, async () => {
    const query = "SELECT * FROM kitchen_items WHERE rating >= ?";
    const kitchenItems = await DB?.all(query, [minRating]);

    if (kitchenItems?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Kitchen Items found, rating ${minRating}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Kitchen Items fetched successfully",
      kitchenItems,
      hits: kitchenItems?.length,
    });
  });
};

// Exercise 2: Fetch Kitchen Items by Material and Rating
const getKitchenItemsByMaterialRating = (req, res) => {
  const minRating = req.query?.minRating || "0";
  const material = req.query?.material;

  errorHandler(res, async () => {
    if (!material) {
      throw new HttpError({
        message: "material and minRating query are required",
      });
    }

    const query =
      "SELECT * FROM kitchen_items WHERE material = ? AND rating > ?";
    const kitchenItems = await DB?.all(query, [material, minRating]);

    if (kitchenItems?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Kitchen Items found, material ${material} and rating ${minRating}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Kitchen Items fetched successfully",
      kitchenItems,
      hits: kitchenItems?.length,
    });
  });
};

// Exercise 3: Fetch Kitchen Items Ordered by Price
const getKitchenItemsOrderedByPrice = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";
  errorHandler(res, async () => {
    const query = `SELECT * FROM kitchen_items ORDER BY price ${
      lowToHigh ? "ASC" : "DESC"
    }`;
    const kitchenItems = await DB?.all(query, []);

    if (kitchenItems?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Kitchen Items found`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Kitchen Items fetched successfully",
      kitchenItems,
      hits: kitchenItems?.length,
    });
  });
};

// ROUTES
kitchenRouter.get("/rating", getKitchenItemsByRating);
kitchenRouter.get("/material-rating", getKitchenItemsByMaterialRating);
kitchenRouter.get("/ordered-by-price", getKitchenItemsOrderedByPrice);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
