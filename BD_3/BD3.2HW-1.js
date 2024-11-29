const express = require("express");

const app = express();
const PORT = 3000;

// Constants
const HTTP_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Dummy Data
const users = [
  {
    id: 1,
    username: "ankit",
    fullName: "Ankit Kumar",
    email: "ankit@gmail.com",
  },
  {
    id: 2,
    username: "dhananjit",
    fullName: "Dhananjit Singh",
    email: "dhananjit.singh@gmail.com",
  },
];
const creditCards = [
  { number: "1234567890123456", holder: "John Doe", expiry: "12/24" },
  { number: "9876543210987654", holder: "Jane Smith", expiry: "06/23" },
];
const books = [
  { isbn: "9783161484100", title: "Example Book", author: "John Author" },
  { isbn: "9781234567897", title: "Another Book", author: "Jane Writer" },
];
const peoples = [
  { ssn: "123-45-6789", name: "John Doe", birthDate: "1990-01-01" },
  { ssn: "987-65-4321", name: "Jane Smith", birthDate: "1985-05-05" },
];

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
    this.message = message;
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

// Utils Functions
function findElement(elementArr, value, func) {
  const element = elementArr?.find(func);
  return element || `${value} is not available`;
}

// Routes
// Exercise 1: Check username availability
app.get("/username/find/:username", (req, res) => {
  const username = req.params?.username;
  errorHandler(res, () => {
    if (!username) {
      throw new HttpError({ message: "username param is required" });
    }
    const findUser = findElement(
      users,
      username,
      (user) => user?.username == username
    );

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      user: findUser,
    });
  });
});

//Exercise 2: Find Credit Card Number
app.get("/credit-cards/find", (req, res) => {
  const cardNumber = req.query?.cardNumber;
  errorHandler(res, () => {
    if (!cardNumber) {
      throw new HttpError({ message: "cardNumber query is required" });
    }

    const findCard = findElement(
      creditCards,
      cardNumber,
      (card) => card?.number === cardNumber
    );

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      creditCard: findCard,
    });
  });
});

// Exercise 3: Find Email Address
app.get("/emails/find", (req, res) => {
  const email = req.query?.email;
  errorHandler(res, () => {
    if (!email) {
      throw new HttpError({ message: "email query is required" });
    }

    const findUser = findElement(users, email, (user) => user?.email === email);

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      user: findUser,
    });
  });
});

// Exercise 4: Find ISBN Number ( for books )
app.get("/books/find", (req, res) => {
  const isbn = req.query?.isbn;
  errorHandler(res, () => {
    if (!isbn) {
      throw new HttpError({ message: "isbn query is required" });
    }
    const findBook = findElement(books, isbn, (book) => book?.isbn == isbn);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      book: findBook,
    });
  });
});

//Exercise 5: Find Social Security Number (SSN)
app.get("/ssn/find", (req, res) => {
  const ssn = req.query?.ssn;
  errorHandler(res, () => {
    if (!ssn) {
      throw new HttpError({ message: "ssn query is required" });
    }
    const findPeople = findElement(
      peoples,
      ssn,
      (people) => people?.ssn == ssn
    );

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      people: findPeople,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
