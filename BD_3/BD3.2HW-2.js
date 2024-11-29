const express = require("express");

const app = express();
const PORT = 3000;

// Constants
const HTTP_STATUS_CODES = {
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 400,
  RESPONSE_OK: 200,
};

// Dummy Data
const phones = [
  { number: "123-456-7890", owner: "Alice", type: "mobile" },
  { number: "987-654-3210", owner: "Bob", type: "home" },
];
const accounts = [
  { number: "111122223333", holder: "Charlie", balance: 5000 },
  { number: "444455556666", holder: "Dave", balance: 3000 },
];
const licenses = [
  { number: "D1234567", name: "Eve", expiryDate: "2026-04-01" },
  { number: "D7654321", name: "Frank", expiryDate: "2024-11-15" },
];
const employees = [
  { id: "E1234", name: "Grace", department: "Engineering" },
  { id: "E5678", name: "Hank", department: "Marketing" },
];
const orders = [
  { id: "ORD12345", customerName: "Ivy", totalAmount: 150 },
  { id: "ORD67890", customerName: "Jake", totalAmount: 200 },
];

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
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

// Utils
function resQueryOrParam(name, param) {
  if (param) {
    return `${name} param is required`;
  }
  return `${name} query is required`;
}

function findElement(elementArr, value, func) {
  const element = elementArr?.find(func);
  return element || `${value} is not available`;
}

// Routes
// Exercise 1: Find Mobile Phone Number
app.get("/phones/find", (req, res) => {
  const phoneNumber = req.query?.phoneNumber;
  errorHandler(res, () => {
    if (!phoneNumber) {
      throw new HttpError({ message: resQueryOrParam("phoneNumber") });
    }
    const findPhone = findElement(
      phones,
      phoneNumber,
      (phone) => phone?.number == phoneNumber
    );

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      phone: findPhone,
    });
  });
});

// Exercise 2: Find Bank Account Number
app.get("/accounts/find", (req, res) => {
  const accountNumber = req.query?.accountNumber;
  errorHandler(res, () => {
    if (!accountNumber) {
      throw new HttpError({ message: resQueryOrParam("accountNumber") });
    }
    const findAccount = findElement(
      accounts,
      accountNumber,
      (account) => account?.number == accountNumber
    );
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      account: findAccount,
    });
  });
});

// Exercise 3: Find Driver's License Number
app.get("/licenses/find", (req, res) => {
  const licenseNumber = req.query?.licenseNumber;
  errorHandler(res, () => {
    if (!licenseNumber) {
      throw new HttpError({ message: resQueryOrParam("licenseNumber") });
    }
    const findLicense = findElement(
      licenses,
      licenseNumber,
      (license) => license?.number == licenseNumber
    );
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      license: findLicense,
    });
  });
});

// Exercise 4: Find Employee ID
app.get("/employees/find", (req, res) => {
  const employeeId = req.query?.employeeId;
  errorHandler(res, () => {
    if (!employeeId) {
      throw new HttpError({ message: resQueryOrParam("employeeId") });
    }
    const findEmployee = findElement(
      employees,
      employeeId,
      (employee) => employee?.id == employeeId
    );
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      employee: findEmployee,
    });
  });
});

// Exercise 5: Find Order ID
app.get("/orders/find", (req, res) => {
  const orderId = req.query?.orderId;
  errorHandler(res, () => {
    if (!orderId) {
      throw new HttpError({ message: resQueryOrParam("orderId") });
    }
    const findOrder = findElement(
      orders,
      orderId,
      (order) => order?.id == orderId
    );
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      order: findOrder,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
