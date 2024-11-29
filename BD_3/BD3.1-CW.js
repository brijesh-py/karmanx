const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Router
const numberRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/numbers", numberRouter);

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Sample Data
const numbers = [1, 2, 3, 4, 5];
const strings = ["hello", "world", "javascript", "node"];

// Utility Functions or Logics
function errorResponse(res, func, message) {
  try {
    func();
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: message || error?.message || "Internal server error",
    });
  }
}

function insertElementInArr(array, value) {
  const arrayCopy = structuredClone(array);
  arrayCopy?.push(value);
  return arrayCopy;
}

function sumOfNumbersArr(numbersArr) {
  let sumAnArray = 0;
  for (let number in numbersArr) {
    sumAnArray += numbersArr[number];
  }
  return sumAnArray;
}

function findMaxNumberArr(numbersArr) {
  let temp = 0;
  for (let number in numbersArr) {
    if (temp < numbersArr[number]) {
      temp = numbersArr[number];
    }
  }
  return temp;
}

// Controllers
function addNumber(req, res) {
  errorResponse(res, () => {
    const updatedArr = insertElementInArr(numbers, 6);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      numbers: updatedArr,
    });
  });
}

function addString(req, res) {
  errorResponse(res, () => {
    const updatedArr = insertElementInArr(strings, "express");
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      strings: updatedArr,
    });
  });
}

function sumOfNumbers(req, res) {
  errorResponse(res, () => {
    const sumAnArray = sumOfNumbersArr(numbers);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      sum: sumAnArray,
    });
  });
}

function findMaxNumber(req, res) {
  errorResponse(res, () => {
    const maxNumber = findMaxNumberArr(numbers);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      max: maxNumber,
    });
  });
}

// Routes
numberRouter.get("/add", addNumber);
numberRouter.get("/sum", sumOfNumbers);
numberRouter.get("/max", findMaxNumber);
app.get("/strings/add", addString);

app.listen(PORT, () => {
  console.warn(`Server started on port ${PORT}`);
});
