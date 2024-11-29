const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;

// Dummy Data
const cartItems = [
  { item: "Book", price: 30 },
  { item: "Pen", price: 5 },
  { item: "Notebook", price: 50 },
  { item: "Bag", price: 125 },
];
const students = [
  { name: "John", grade: "A" },
  { name: "Jane", grade: "A" },
  { name: "Jack", grade: "B" },
  { name: "Jill", grade: "C" },
];
const temperatures = [0, 20, 30, 100];
const student_scores = [
  { name: "John", score: 85 },
  { name: "Jane", score: 90 },
  { name: "Jack", score: 70 },
  { name: "Jill", score: 60 },
];
const sentence = "The quick brown fox jumps over the lazy dog";

// Error Handling
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message || "An unexpected error occurred";
  }
}

function errorResponse(res, func, message) {
  try {
    func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.statusCode).json({
        status: error?.statusCode,
        message: message || error?.message || "Internal server error",
      });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
}

// Utility Functions
function getCartTotalPrice(cartItemsArr) {
  let totalItemPrice = 0;
  cartItemsArr?.map((item) => {
    item?.price && (totalItemPrice += item.price);
  });
  return totalItemPrice;
}

function getFilteredStudentsByGrade(studentsArr, grade) {
  const filteredStudents = studentsArr?.filter(
    (student) => student?.grade?.toLowerCase() == grade?.toLowerCase()
  );
  return filteredStudents;
}

function getCelsiusToTemperatures(temperaturesArr) {
  const convertedTemperatures = temperaturesArr?.map(
    (temp) => (temp * 9) / 5 + 32
  );
  return convertedTemperatures;
}

function getAverageScoreOfStudents(studentsArr) {
  let totalScore = 0;
  studentsArr?.map((student) => {
    student?.score && (totalScore += student.score);
  });
  return totalScore / studentsArr?.length;
}

function getLengthOfWordsInSentence(sentenceStr) {
  const sentenceArr = sentenceStr?.split(" ");
  return sentenceArr.length;
}

// Routes
// Exercise 1: Calculate Total Price of Items in a Cart
app.get("/cart/total", (req, res) => {
  errorResponse(res, () => {
    const totalItemPrice = getCartTotalPrice(cartItems);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      totalPrice: totalItemPrice,
    });
  });
});

// Exercise 2: Filter Students by Grade
app.get("/students/filter", (req, res) => {
  const grade = req.query?.grade;
  errorResponse(res, () => {
    if (!grade) {
      throw new HttpError(404, "Grade query is required");
    }
    const filteredStudents = getFilteredStudentsByGrade(students, grade);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      students: filteredStudents,
    });
  });
});

// Exercise 3: Convert Temperatures from Celsius to Fahrenheit
app.get("/temperatures/convert", (req, res) => {
  errorResponse(res, () => {
    const convertedTemperatures = getCelsiusToTemperatures(temperatures);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      convertedTemperatures,
    });
  });
});

// Exercise 4: Calculate Average Score of Students
app.get("/students/average-score", (req, res) => {
  errorResponse(res, () => {
    const averageScore = getAverageScoreOfStudents(student_scores);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      averageScore,
    });
  });
});

// Exercise 5: Count Words in a Sentence
app.get("/sentence/count-words", (req, res) => {
  errorResponse(res, () => {
    const countWords = getLengthOfWordsInSentence(sentence);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      wordCount: countWords,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server started on port ${PORT}`);
});
