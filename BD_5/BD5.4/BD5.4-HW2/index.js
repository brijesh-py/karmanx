const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const Student = require("./models/student.model");
const Course = require("./models/course.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

//  ROUTERs
const studentRouter = express.Router();
const courseRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use("/students", studentRouter);
app.use("/courses", courseRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// RESPONSE MESSAGES
const MESSAGES = {
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "Already resource exists",
  BAD_REQUEST: "Invalid request. Please check your input.",
  INTERNAL_SERVER: "An internal server error occurred. Please try again later.",
};

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
    if (process.env.ENV != "development") {
      console.log(error);
    }
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: MESSAGES?.INTERNAL_SERVER,
      });
    }
  }
};

// DUMMY DATA
const coursesData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];
const studentsData = [{ name: "John Doe", age: 24 }];

// CONTROLLERS
// Exercise 1: Create New Student
const createStudent = (req, res) => {
  const name = req.body?.name;
  const age = parseInt(req.body?.age);
  errorHandler(res, async () => {
    if (!name || !age) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }
    const student = { name, age };
    const newStudent = await Student.create(student);
    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Student created successfully",
      newStudent,
    });
  });
};

// Exercise 2: Update Student by ID
const updateStudent = (req, res) => {
  const name = req.body?.name;
  const age = parseInt(req.body?.age);
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !name || !age) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }

    const isStudentExists = await Student.findOne({ where: { id } });
    if (!isStudentExists) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }

    const student = { name, age };
    await Student.update(student, { where: { id } });
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Student updated successfully",
      student: { name, age },
    });
  });
};

// STUDENT ROUTES
studentRouter.post("/new", createStudent);
studentRouter.put("/update/:id", updateStudent);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Course.bulkCreate(coursesData);
    await Student.bulkCreate(studentsData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
