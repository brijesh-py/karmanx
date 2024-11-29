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
const trackRouter = express.Router();

// middlewares
app.use(cors());
app.use("/tracks", trackRouter);

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

// config database
let db;
(async () => {
  try {
    db = await open({
      filename: "./tracks_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// controllers
// Exercise 1: Retrieve All Tracks
const getTracks = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM tracks";
    const tracks = await db?.all(query, []);

    // response
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      tracks,
    });
  });
};

// Exercise 2,3 and 4: Retrieve Tracks by props
const getTracksByProps = (prop) => {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECT * FROM tracks WHERE ${prop} = ?`;
      const tracks = await db?.all(query, [key]);

      // response
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        tracks,
      });
    });
  };
};

// routes
trackRouter.get("/", getTracks);
trackRouter.get("/artist/:artist", getTracksByProps("artist"));
trackRouter.get("/genre/:genre", getTracksByProps("genre"));
trackRouter.get(
  "/release_year/:release_year",
  getTracksByProps("release_year")
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
