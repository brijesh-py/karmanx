const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;

// Utility functions
function filterEvenNumbers(listOfNumbers) {
  const evenNumbers = listOfNumbers.filter((number) => number % 2 === 0);
  return evenNumbers;
}

function filterAges(listOfAges) {
  const ages = listOfAges.filter((number) => number > 18);
  return ages;
}

function filterLongWords(listOfWords, len = 5) {
  const longWords = listOfWords.filter((word) => word.length > len);
  return longWords;
}

function filterSmallFiles(listOfFiles, sizeOfFile = 100) {
  const smallFiles = listOfFiles.filter((file) => file < sizeOfFile);
  return smallFiles;
}

// routes
// Question 1: Return Only the Even Numbers
app.get("/even-numbers", (req, res) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const evenNumbers = filterEvenNumbers(numbers);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    evenNumbers,
  });
});

// Question 2: Return Only the Ages Greater Than 18
app.get("/adult-ages", (req, res) => {
  const ages = [10, 20, 30, 15, 17, 25];
  const adultAges = filterAges(ages);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    adultAges,
  });
});

// Question 3: Return Only the Words Longer Than 5 Characters
app.get("/long-words", (req, res) => {
  const words = ["apple", "banana", "cherry", "date", "fig", "grape"];
  const longWords = filterLongWords(words, 5);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    longWords,
  });
});

// Question 4: Return Only the Files Smaller Than a Certain Size
app.get("/small-files", (req, res) => {
  const filterFileSize = parseFloat(req.query?.filterParam);
  const fileSizes = [50, 200, 75, 120, 30, 90, 150];
  const smallFiles = filterSmallFiles(fileSizes, filterFileSize);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    smallFiles,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
