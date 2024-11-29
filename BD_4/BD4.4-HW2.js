const express = require("express");
const dotenv = require("dotenv");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

// CONFIG .ENV
dotenv.config();

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// artwork ROUTER
const artworkRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/artworks", artworkRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIGURATION'S
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./artworks_database.sqlite",
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
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
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
        error: error?.stack,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "An unexpected error occurred",
        error: error?.error,
      });
    }
  }
};

// CONTROLLERS
// Exercise 1: Fetch All Artworks
const getArtworks = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM artworks";
    const artworks = await DB?.all(query, []);
    if (artworks?.length == 0 || !artworks) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No artworks found",
        error: {
          code: "NOT_FOUND",
          details: "The requested artworks not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "artworks fetched successfully",
      artworks,
      hits: artworks?.length,
    });
  });
};

// Exercise 2, 3 AND 4: Fetch Artworks by (PROP)
const getArtworksByProps = (key, options) => {
  return (req, res) => {
    const value = req.params[key];
    const selectedField = options?.join(", ") || "*";
    errorHandler(res, async () => {
      const query = `SELECT ${selectedField} FROM artworks WHERE ${key} = ?`;
      const artworks = await DB?.all(query, [value]);

      if (artworks?.length == 0 || !artworks) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No artwork found",
          error: {
            code: "NOT_FOUND",
            details: "The requested artwork not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "artworks fetched successfully",
        artworks,
        hits: artworks?.length
      });
    });
  };
};

// ROUTES
artworkRouter.get("/", getArtworks);
artworkRouter.get(
  "/artist/:artist",
  getArtworksByProps("artist", ["id", "title", "artist", "year"])
);
artworkRouter.get(
  "/year/:year",
  getArtworksByProps("year", ["id", "title", "artist", "year"])
);
artworkRouter.get(
  "/medium/:medium",
  getArtworksByProps("medium", ["id", "title", "artist", "medium"])
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
