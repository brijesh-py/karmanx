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

// MOVIE ROUTER
const courseRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/courses", courseRouter);

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
      filename: "./courses_database.sqlite",
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
// Exercise 1: Fetch Courses by Minimum Rating
const getCoursesByRating = (req, res) => {
  const { minRating = 4 } = req.query;
  errorHandler(res, async () => {
    const query = `SELECT * FROM courses WHERE rating > ${minRating}`;
    const courses = await DB?.all(query, []);

    if (courses?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Course found, minRating ${minRating}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Courses fetched successfully",
      courses,
      hits: courses?.length,
    });
  });
};

// Exercise 2: Fetch Courses by Instructor and Minimum Duration
const getCoursesByInstructorAndDuration = (req, res) => {
  const { instructor, minDuration } = req.query;
  errorHandler(res, async () => {
    if (!instructor || !minDuration) {
      throw new HttpError({
        message: "instructor and minDuration query are required",
      });
    }

    const query = `SELECT * FROM courses WHERE instructor = ? AND duration > ?`;
    const courses = await DB?.all(query, [instructor, minDuration]);

    if (courses?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Course found, instructor ${instructor} and duration ${minDuration}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Courses fetched successfully",
      courses,
      hits: courses?.length,
    });
  });
};

// Exercise 3: Fetch Courses Ordered by Price
const getCoursesOrderedByPrice = (req, res) => {
  const lowToHigh = req.query?.low_to_high == "true";
  errorHandler(res, async () => {
    const query = `SELECT * FROM courses ORDER BY price ${
      lowToHigh ? "ASC" : "DESC"
    } `;
    const courses = await DB?.all(query, []);

    if (courses?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Course found`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Courses fetched successfully",
      courses,
      hits: courses?.length,
    });
  });
};

// ROUTES
courseRouter.get("/rating", getCoursesByRating);
courseRouter.get("/instructor-duration", getCoursesByInstructorAndDuration);
courseRouter.get("/ordered-by-price", getCoursesOrderedByPrice);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
