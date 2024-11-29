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
const heights = [160, 175, 180, 165, 170];
const employees = [
  { name: "Rahul", employeeId: 101, salary: 50000 },
  { name: "Sita", employeeId: 102, salary: 60000 },
  { name: "Amit", employeeId: 103, salary: 45000 },
];
const books = [
  { title: "The God of Small Things", author: "Arundhati Roy", pages: 340 },
  { title: "The White Tiger", author: "Aravind Adiga", pages: 321 },
  { title: "The Palace of Illusions", author: "Chitra Banarjee", pages: 360 },
];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedHeights(heights, isAscend = true) {
  if (isAscend) {
    return structuredClone(heights).sort(
      (height1, height2) => height1 - height2
    );
  }
  return structuredClone(heights).sort((height1, height2) => height2 - height1);
}

function getSortedEmployeesBySalary(employees, isAscend = true) {
  if (isAscend) {
    return structuredClone(employees).sort((e1, e2) => e1?.salary - e2?.salary);
  }
  return structuredClone(employees).sort((e1, e2) => e2?.salary - e1?.salary);
}

function getSortedBooksByPages(books, isAscend = true) {
  if (isAscend) {
    return structuredClone(books).sort(
      (book1, book2) => book1?.pages - book2?.pages
    );
  }
  return structuredClone(books).sort(
    (book1, book2) => book2?.pages - book1?.pages
  );
}

// Routes
// Question 1:
app.get("/heights/sort-ascending", (req, res) => {
  try {
    const sortedHeights = getSortedHeights(heights);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      heights: sortedHeights,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 2:
app.get("/heights/sort-descending", (req, res) => {
  try {
    const sortedHeights = getSortedHeights(heights, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      heights: sortedHeights,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 3:
app.get("/employees/sort-by-salary-descending", (req, res) => {
  try {
    const sortedEmployees = getSortedEmployeesBySalary(employees, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      employees: sortedEmployees,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Question 4:
app.get("/books/sort-by-pages-ascending", (req, res) => {
  try {
    const sortedBooks = getSortedBooksByPages(books);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      books: sortedBooks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
