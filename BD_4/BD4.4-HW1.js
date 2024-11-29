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

// COURSE ROUTER
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
      filename: "./course_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// ERROR HANDLER
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
// Exercise 1: Fetch All Courses
const getCourses = (req, res) => {
  errorHandler(res, async () => {
    const query = "SElECT * FROM courses";
    const course = await DB?.all(query, []);
    if (course.length == 0 || !course) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No course found",
        error: {
          code: "NOT_FOUND",
          details: "The requested course not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "courses fetched successfully",
      course,
    });
  });
};

// Question 2 and 3: Fetch All courses by Props
const getCoursesByProps = (prop) => {
  return (req, res) => {
    const key = req.params[prop];
    errorHandler(res, async () => {
      const query = `SELECT * FROM courses WHERE ${prop} = ?`;
      const course = await DB?.all(query, [key]);

      if (course.length == 0 || !course) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No course found",
          error: {
            code: "NOT_FOUND",
            details: "The requested course not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "courses fetched successfully",
        course,
      });
    });
  };
};

// ROUTES
courseRouter.get("/", getCourses);
courseRouter.get("/instructor/:instructor", getCoursesByProps("instructor"));
courseRouter.get("/category/:category", getCoursesByProps("category"));
courseRouter.get("/year/:release_year", getCoursesByProps("release_year"));

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
