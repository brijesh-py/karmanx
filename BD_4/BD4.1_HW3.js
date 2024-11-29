const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const dotenv = require("dotenv");
const cors = require("cors");

// config
dotenv.config();

// initializing server
const app = express();
const PORT = process.env.PORT || 5000;

// Track Router
const productRouter = express.Router();

// middlewares
app.use(cors());
app.use("/products", productRouter);

// constants
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// error handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR;
  }
}

const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message || "Some went wrong!",
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
};

// config Database
let db;
(async function () {
  try {
    db = await open({
      filename: "./products_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// Controllers
// Exercise 1: Fetch All Products
function getProducts(req, res) {
  errorHandler(res, async () => {
    const query = "SELECT * FROM products";
    const products = await db?.all(query, []);

    // response
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      products,
    });
  });
}

// Exercise 2,3 and 4: Retrieve Products by prop
function getProductsByProps(prop) {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECT * FROM products WHERE ${prop} = ?`;
      const products = await db?.all(query, [key]);

      //   response
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES,
        products,
      });
    });
  };
}

// Routes
productRouter.get("/", getProducts);
productRouter.get("/brand/:brand", getProductsByProps("brand"));
productRouter.get("/category/:category", getProductsByProps("category"));
productRouter.get("/stock/:stock", getProductsByProps("stock"));

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
