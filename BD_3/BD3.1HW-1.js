const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Router
const numberRouter = express.Router();
const stringRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/numbers", numberRouter);
app.use("/strings", stringRouter);

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy Data
let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

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

function multiplyNumbersInArr(numbers, multiplier) {
  const updatedArr = numbers?.map((number) => number * multiplier);
  return updatedArr;
}

function removeOddNumbersInArr(numbers) {
  const updatedArr = numbers?.filter((number) => number % 2 === 0);
  return updatedArr;
}

function doubleNumbersInArr(numbers) {
  const updatedArr = numbers?.map((number) => number + number);
  return updatedArr;
}

function concatStringsInArr(strings, concatStr) {
  const updatedArr = strings?.map((str) => str + concatStr);
  return updatedArr;
}

// Controllers
// Exercise 1: Multiply All Numbers in an Array
function multiplyNumbers(req, res) {
  const multiplier = parseFloat(req.query?.multiplier);
  errorResponse(res, () => {
    if (isNaN(multiplier)) {
      throw new Error("multiplier query expected a number");
    }

    const updatedArr = multiplyNumbersInArr(numbers, multiplier);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      result: updatedArr,
    });
  });
}

// Exercise 3: Remove All Odd Numbers from an Array
function removeOddNumbers(req, res) {
  errorResponse(res, () => {
    const updatedArr = removeOddNumbersInArr(numbers);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      result: updatedArr,
    });
  });
}

// Exercise 5: Double All Numbers in an Array
function doubleNumbers(req, res) {
  errorResponse(res, () => {
    const updatedArr = doubleNumbersInArr(numbers);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      result: updatedArr,
    });
  });
}

// Exercise 2: Concatenate Strings
function concatStrings(req, res) {
  const suffix = req.query?.suffix;
  errorResponse(res, () => {
    if (!suffix) {
      throw new Error("suffix query is required");
    }

    const updatedArr = concatStringsInArr(strings, suffix);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      result: updatedArr,
    });
  });
}

// Exercise 4: Join All Strings in an Array
function joinStrings(req, res) {
  errorResponse(res, () => {
    const updatedArr = strings?.join(" ");
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      result: updatedArr,
    });
  });
}

// Routes
numberRouter.get("/multiply", multiplyNumbers);
numberRouter.get("/remove-odds", removeOddNumbers);
numberRouter.get("/double", doubleNumbers);
stringRouter.get("/concat", concatStrings);
stringRouter.get("/join", joinStrings);

app.listen(PORT, () => {
  console.warn(`Server started on port ${PORT}`);
});
