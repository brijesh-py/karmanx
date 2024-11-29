const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy static data
const employees = [
  { name: "Rahul Gupta", department: "HR", salary: 50000 },
  { name: "Sneha Sharma", department: "Finance", salary: 60000 },
  { name: "Priya Singh", department: "Marketing", salary: 55000 },
  { name: "Amit Kumar", department: "IT", salary: 65000 },
];
const bikes = [
  { make: "Hero", model: "Splendor", mileage: 80 },
  { make: "Bajaj", model: "Pulser", mileage: 60 },
  { make: "TVS", model: "Apache", mileage: 70 },
];
const songs = [
  { title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
  { title: "Senorita", genre: "Pop", rating: 5 },
  { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 },
];
const tasks = [
  { taskId: 1, taskName: "Prepare Presentation", status: "pending" },
  { taskId: 2, taskName: "Attend Meeting", status: "in-progress" },
  { taskId: 3, taskName: "Submit Report", status: "completed" },
];

// Utility functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status: status,
    success: false,
    message: error || "Internal server error",
  });
}

function filterByDepartment(employees, department) {
  const filteredDepartment = employees.filter(
    (employee) => employee?.department === department && employee
  );
  return filteredDepartment;
}

function filterByMileage(bikes, mileage) {
  const filteredBikes = bikes.filter((bike) => bike?.mileage > mileage);
  return filteredBikes;
}

function filterByMake(bikes, make) {
  const filteredBikes = bikes.filter((bike) => bike?.make === make);
  return filteredBikes;
}

function filterByRating(songs, rating) {
  const filteredSongs = songs.filter((song) => song?.rating > rating);
  return filteredSongs;
}

function filterByGenre(songs, genre) {
  const filteredSongs = songs.filter((song) => song?.genre === genre);
  return filteredSongs;
}

function filterByStatus(tasks, status) {
  const filteredTasks = tasks.filter((task) => task?.status === status);
  return filteredTasks;
}

// routes
// Question 1:
app.get("/employees/department/:department", (req, res) => {
  const department = req.params?.department;
  try {
    const filteredDepartment = filterByDepartment(employees, department);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      departments: filteredDepartment,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 2:
app.get("/bikes/mileage/:minMileage", (req, res) => {
  const minMileage = parseInt(req.params?.minMileage);
  try {
    const filteredBikes = filterByMileage(bikes, minMileage);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      bikes: filteredBikes,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 3:
app.get("/bikes/make/:make", (req, res) => {
  const make = req.params?.make;
  try {
    const filteredBikes = filterByMake(bikes, make);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      bikes: filteredBikes,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 4:
app.get("/songs/rating/:minRating", (req, res) => {
  const rating = parseFloat(req.params?.minRating);
  try {
    const filteredSongs = filterByRating(songs, rating);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      songs: filteredSongs,
    });
  } catch (error) {
    errorResponse({
      res,
      status: INTERNAL_SERVER_ERROR,
      error: error?.message,
    });
  }
});

// Question 5:
app.get("/songs/genre/:genre", (req, res) => {
  const genre = req.params?.genre;
  try {
    const filteredSongs = filterByGenre(songs, genre);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      songs: filteredSongs,
    });
  } catch (error) {
    errorResponse({
        res,
        status: INTERNAL_SERVER_ERROR,
        error: error?.message,
      });
  }
});

// Question 6:
app.get("/tasks/status/:status", (req, res) => {
  const status = req.params?.status;
  try {
    const filteredTasks = filterByStatus(tasks, status);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      tasks: filteredTasks,
    });
  } catch (error) {
    errorResponse({
        res,
        status: INTERNAL_SERVER_ERROR,
        error: error?.message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
