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
const products = [
  { productId: 1, name: "Laptop", inStock: true },
  { productId: 2, name: "Phone", inStock: true },
  { productId: 3, name: "Tablet", inStock: false },
];
const employees = [
  { employeeId: 1, name: "Alice", active: true },
  { employeeId: 2, name: "Bob", active: true },
  { employeeId: 3, name: "Charlie", active: false },
];
const orders = [
  { orderId: 1, product: "Laptop", delivered: false },
  { orderId: 2, product: "Phone", delivered: true },
  { orderId: 3, product: "Tablet", delivered: false },
];
const reservations = [
  { reservationId: 1, name: "John", confirmed: false },
  { reservationId: 2, name: "Jane", confirmed: true },
  { reservationId: 3, name: "Jack", confirmed: false },
];
const subscriptions = [
  { subscriptionId: 1, service: "Netflix", active: false },
  { subscriptionId: 2, service: "Spotify", active: true },
  { subscriptionId: 3, service: "Amazon Prime", active: false },
];

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
function removeElement(elementArr, key, value) {
  return elementArr?.filter((element) => element[key] == value);
}

function updateArray(elementArr, key, value, obj) {
  return elementArr?.map((element) =>
    element[key] == value ? { ...element, ...obj } : element
  );
}

// Routes
// Example 1: Remove Out of Stock Products
app.get("/products/remove-out-of-stock", (req, res) => {
  errorHandler(res, function () {
    const updatedProducts = removeElement(products, "inStock", true);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      products: updatedProducts,
    });
  });
});

// Example 2: Update Employee Active Status by ID
app.get("/employees/update", (req, res) => {
  const employeeId = req.query?.employeeId;
  const active = req.query?.active == "true";
  errorHandler(res, () => {
    if (!employeeId) {
      throw new HttpError({ message: "employeeId is required" });
    }
    const updatedEmployees = updateArray(employees, "employeeId", employeeId, {
      active,
    });
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      employees: updatedEmployees,
    });
  });
});

// Example 3: Update Order Delivery Status by ID
app.get("/orders/update", (req, res) => {
  const orderId = req.query?.orderId;
  const delivered = req.query?.delivered == "true";
  errorHandler(res, () => {
    if (!orderId) {
      throw new HttpError({ message: "orderId is required" });
    }
    const updatedOrders = updateArray(orders, "orderId",orderId, {delivered});
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      orders: updatedOrders,
    });
  });
});

// Example 4: Remove Unconfirmed Reservations
app.get("/reservations/remove-unconfirmed", (req, res) => {
  errorHandler(res, () => {
    const updatedOrders = removeElement(reservations, "confirmed", true);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      orders: updatedOrders,
    });
  });
});

// Example 5: Update Subscription Status by ID
app.get("/subscriptions/update", (req, res) => {
  const subscriptionId = req.query?.subscriptionId;
  const active = req.query?.active == "true";
  errorHandler(res, () => {
    if (!subscriptionId) {
      throw new HttpError({ message: "subscriptionId is required" });
    }

    const updatedOrders = updateArray(
      subscriptions,
      "subscriptionId",
      subscriptionId,
      { active }
    );
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      orders: updatedOrders,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
