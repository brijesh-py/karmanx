const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;

// Utility functions
function isPrime(number) {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

function filterPrimeNumbers(numbers) {
  return numbers.filter(isPrime);
}

function filterPositiveNumbers(numbers) {
  const positiveNumbers = numbers.filter((number) => number >= 1);
  return positiveNumbers;
}

function filterNegativeNumbers(numbers) {
  const negativeNumbers = numbers.filter((number) => number < 0);
  return negativeNumbers;
}

function filterOddNumbers(numbers) {
  const oddNumbers = numbers.filter((number) => number % 2 !== 0);
  return oddNumbers;
}

function filterNumbersGreaterThan(numbers, value = 6) {
  const largestNumbers = numbers.filter((number) => number > value);
  return largestNumbers;
}

function filterNumbersLessThan(numbers, value = 4) {
  const lowestNumbers = numbers.filter((number) => number < value);
  return lowestNumbers;
}

// routes
// Exercise 1: Filter Prime Numbers
app.get("/prime-numbers", (req, res) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const primeNumbers = filterPrimeNumbers(numbers);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    primeNumbers,
  });
});

// Exercise 2: Filter Positive Numbers
app.get("/positive-numbers", (req, res) => {
  const numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const positiveNumbers = filterPositiveNumbers(numbers);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    positiveNumbers,
  });
});

// Exercise 3: Filter Negative Numbers
app.get("/negative-numbers", (req, res) => {
  const numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const negativeNumbers = filterNegativeNumbers(numbers);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    negativeNumbers,
  });
});

// Filter Odd Numbers
app.get("/odd-numbers", (req, res) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const oddNumbers = filterOddNumbers(numbers);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    oddNumbers,
  });
});

// Exercise 5: Filter Numbers Greater Than a Given Value
app.get("/numbers-greater-than", (req, res) => {
  const value = parseFloat(req.query?.value);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const largestNumbers = filterNumbersGreaterThan(numbers, value);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    largestNumbers,
  });
});

// Exercise 6: Filter Numbers Less Than a Given Value
app.get("/numbers-less-than", (req, res) => {
  const value = parseFloat(req.query?.value);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const lowestNumbers = filterNumbersLessThan(numbers, value);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    lowestNumbers,
  });
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
