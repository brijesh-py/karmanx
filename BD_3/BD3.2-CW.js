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
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const names = ["Rahul", "Sita", "Amit", "Vikram", "Priya"];
const employees = [
  { employeeId: 1, name: "Rahul" },
  { employeeId: 2, name: "Sita" },
  { employeeId: 3, name: "Amit" },
];
const contacts = [
  { phoneNumber: "1234567890", name: "Rahul", address: "123 Street, City" },
  { phoneNumber: "0987654321", name: "Sita", address: "456 Avenue, City" },
  { phoneNumber: "1112223334", name: "Amit", address: "789 Boulevard, City" },
];

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(Error);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
    this.message = message || "An unexpected error occurred";
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
function findElementAnArr(elementArr, value) {
  const elementExist =
    elementArr?.find((element) => element === value) || `${value} is not exist`;
  return elementExist;
}

function findEmployeeById(employeeArr, id) {
  const findEmployee = employeeArr?.find((employee) => employee?.employeeId === id);
  return findEmployee || `${id} id is not exist`;
}

function findContactByPhoneNumber(contactArr, phoneNumber) {
  const findContact = contactArr?.find(
    (contact) => contact?.phoneNumber === phoneNumber
  );
  return findContact || `${phoneNumber} phone number is not exist`;
}

// Routes
// Exercise 1: Find a Number in the Array
app.get("/numbers/find/:number", (req, res) => {
  const number = parseFloat(req.params?.number);
  errorHandler(res, () => {
    if (isNaN(number)) {
      throw new HttpError({ message: "number param is expected as a number" });
    }

    const findNumber = findElementAnArr(numbers, number);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      number: findNumber,
    });
  });
});

// Exercise 2:Find a Name in the Array
app.get("/names/find/:name", (req, res) => {
  const name = req.params?.name;
  errorHandler(res, () => {
    if (!name) {
      throw new HttpError({ message: "name param is required" });
    }
    const findName = findElementAnArr(names, name);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      name: findName,
    });
  });
});

// Exercise 3: Find an Employee by ID
app.get("/employees/find/:id", (req, res) => {
  const id = parseInt(req.params?.id);
  errorHandler(res, () => {
    if (isNaN(id)) {
      throw new HttpError({ message: "id param is required" });
    }
    const findEmployee = findEmployeeById(employees, id);

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      employee: findEmployee,
    });
  });
});

// Exercise 4: Find a Contact by Phone Number
app.get("/contacts/find/:phoneNumber", (req, res) => {
  const phoneNumber = req.params?.phoneNumber;
  errorHandler(res, () => {
    if (!phoneNumber) {
      throw new HttpError({ message: "phoneNumber param is required" });
    }
    const findContact = findContactByPhoneNumber(contacts, phoneNumber);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      contact: findContact,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server listening on port ${PORT}`);
});
