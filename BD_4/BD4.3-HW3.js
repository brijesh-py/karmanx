const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// config .env
dotenv.config();

// initializing server
const app = express();
const PORT = process.env.PORT || 5000;

// product router
const productRouter = express.Router();

// middlewares
app.use(cors());
app.use("/products", productRouter);

// https status codes
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// database config
let DB;
(async () => {
  try {
    DB = await open({
      filename: "./products_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

// error handler
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
  }
}
async function errorHandler(res, func) {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error.status,
        message: error.message,
        error: error?.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "An unexpected error occurred",
        error: error?.stack,
      });
    }
  }
}

// controllers
// Exercise 1: Fetch All Products by category
const getProductsByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const query = `SELECT * FROM products WHERE ${key} = ?`;
      const products = await DB?.all(query, [value]);

      // database error occurred
      if (!products) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          message: "Database connections failed",
        });
      }

      if (products.length == 0) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No products found",
          error: {
            code: "NOT_FOUND",
            details: "The requested products not found ",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Products fetched successfully",
        products,
        hits: products.length,
      });
    });
  };
};

// Routes
productRouter.get("/category/:category", getProductsByProps("category"));
productRouter.get("/brand/:brand", getProductsByProps("brand"));
productRouter.get("/rating/:rating", getProductsByProps("rating"));
productRouter.get("/stocks/:stocks", getProductsByProps("stocks"));

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
