const express = require("express");

const app = express();
const PORT = 3000;

// Constants
const HTTP_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// ERROR HANDLER
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
  }
}
function errorHandler(res, func) {
  try {
    func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message,
      });
    } else {
      res.status(HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
}

// Utils
// Question 01: Formatted Track Address
const createAddress = (req, res) => {
  const { city, street, state } = req.query;
  errorHandler(res, () => {
    const address = street + ", " + city + ", " + state;
    res.send(address);
  });
};

// Question 02: Employee Greeting
const employeeGreet = (req, res) => {
  const { employeeName } = req.query;
  errorHandler(res, () => {
    const greetMessage = "Welcome to the Company, " + employeeName + "!";
    res.send(greetMessage);
  });
};

// Question 03: Calculate Monthly Savings Goal
const calculateSavingsPerMonth = (req, res) => {
  const { totalAmount, months } = req.query;
  errorHandler(res, () => {
    const saving = parseFloat(totalAmount) / Number(months);
    const message =
      "To save a total amount of ₹" +
      totalAmount +
      " in " +
      months +
      " months, you need to save ₹" +
      saving +
      " per month.";
    res.send(message);
  });
};

// Question 04: Determine Membership Level
const checkMembershipLevel = (req, res) => {
  const { points } = req.query;
  let message = "Bronze";
  if (points >= 3000) {
    message = "Platinum";
  } else if (points >= 2000) {
    message = "Gold";
  } else if (points >= 1000) {
    message = "Silver";
  }
  message = "You are a " + message + " member.";
  res.send(message);
};

// Question 05: Sort Employee Salaries
const sortSalaries = (req, res) => {
  errorHandler(res, () => {
    let salaries = [45000, 60000, 35000, 70000, 50000];
    const sortedSalaries = salaries.sort((s1, s2) => s1 - s2);
    res.send(sortedSalaries);
  });
};

// Question 06: Find Track by Name
const findTrackByName = (req, res) => {
  const { name } = req.query;
  errorHandler(res, () => {
    let tracks = [
      { id: 1, name: "Track One", length: 3.5 },
      { id: 2, name: "Track Two", length: 4.2 },
      { id: 3, name: "Track Three", length: 2.8 },
    ];
    const tracked = tracks.filter((track) => track.name == name);
    res.send(tracked);
  });
};

// Question 07: Filter Long Movies
const filterLongMovies = (req, res) => {
  let movies = [
    { id: 1, title: "Movie One", duration: 120 },
    { id: 2, title: "Movie Two", duration: 150 },
    { id: 3, title: "Movie Three", duration: 90 },
  ];
  const filteredMovies = movies?.filter((movie) => movie?.duration > 120);
  res.send(filteredMovies);
};

// Question 08: Push New Employee
const addNewEmployee = (req, res) => {
  const { name } = req.query;
  errorHandler(res, () => {
    let employees = [{ name: "Amit" }, { name: "Rohan" }];
    employees.push({name});
    res.send(employees);
  });
};

// Question 09: Calculate Monthly Savings
const returnSavings = (req, res) => {
  const income = parseFloat(req.query?.income);
  const expense = parseFloat(req.query?.expenses);
  errorHandler(res, () => {
    const saving = income - expense;
    const message = "You have saved ₹" + saving;
    res.send(message);
  });
};

// Question 10: Filter Recent Movies
const returnRecentMovies = (req, res) => {
  errorHandler(res, () => {
    let movies_new = [
      { id: 1, title: "Movie One", year: 2014 },
      { id: 2, title: "Movie Two", year: 2016 },
      { id: 3, title: "Movie Three", year: 2018 },
    ];
    const filteredMovies = movies_new?.filter((movie) => movie?.year > 2015);
    res.send(filteredMovies);
  });
};

// Routs
app.get("/track-store-address", createAddress);
app.get("/employee-greet", employeeGreet);
app.get("/calculate-savings-goal", calculateSavingsPerMonth);
app.get("/membership-level", checkMembershipLevel);
app.get("/sort-salaries", sortSalaries);
app.get("/find-track", findTrackByName);
app.get("/filter-long-movies", filterLongMovies);
app.get("/add-employee", addNewEmployee);
app.get("/calculate-savings", returnSavings);
app.get("/filter-recent-movies", returnRecentMovies);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
