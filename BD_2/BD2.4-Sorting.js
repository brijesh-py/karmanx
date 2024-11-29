const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy Static Data
const ages = [25, 30, 18, 22, 27];
const students = [
  { name: "Rahul", rollNo: 101, marks: 85 },
  { name: "Sita", rollNo: 102, marks: 95 },
  { name: "Amit", rollNo: 103, marks: 70 },
];
const cars = [
  { name: "Maruti", model: "Swift", mileage: 15 },
  { name: "Hyundai", model: "i20", mileage: 18 },
  { name: "Tata", model: "Nexon", mileage: 20 },
];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedAges(ages, isAscend = true) {
  if (isAscend) {
    return structuredClone(ages).sort((age1, age2) => age1 - age2);
  }
  return structuredClone(ages).sort((age1, age2) => age2 - age1);
}

function getSortedStudentsByMarks(students, isAscend = true) {
  if (isAscend) {
    return structuredClone(students).sort(
      (std1, std2) => std1?.marks - std2?.marks
    );
  }
  return structuredClone(students).sort(
    (std1, std2) => std2?.marks - std1?.marks
  );
}

function getSortedCarsByMileage(cars, isAscend = true) {
  if (isAscend) {
    return structuredClone(cars).sort(
      (car1, car2) => car1?.marks - car2?.marks
    );
  }
  return structuredClone(cars).sort(
    (car1, car2) => car2?.marks - car1?.marks
  );
}

// Routes
// Question 1: Sort Ages in Ascending Order
app.get("/ages/sort-ascending", (req, res) => {
  try {
    const sortedAges = getSortedAges(ages);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      ages: sortedAges,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 2: Sort Ages in Descending Order
app.get("/ages/sort-descending", (req, res) => {
  try {
    const sortedAges = getSortedAges(ages, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      ages: sortedAges,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 3: Sort Students by Marks in Descending Order
app.get("/students/sort-by-marks-descending", (req, res) => {
  try {
    const sortedStudents = getSortedStudentsByMarks(students, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      students: sortedStudents,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 4: Sort Cars by Mileage in Descending Order
app.get("/cars/sort-by-mileage-descending", (req, res) => {
  try {
    const sortedCars = getSortedCarsByMileage(cars, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      cars: sortedCars,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});


app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
