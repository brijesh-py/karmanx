const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Router
const cartRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/cart", cartRouter);

// Constants
const HTTP_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Dummy Data
const cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
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

// ****** Shopping Cart Operations ******

// Utils
function addItemInCart(cartArr, item) {
  const cartCopy = structuredClone(cartArr);
  cartCopy.push(item);
  return cartCopy;
}

function updateCart(cartArr, key, value, obj) {
  return cartArr?.map((product) =>
    product[key] == value ? { ...product, ...obj } : product
  );
}

function deleteProduct(cartArr, productId) {
  return cartArr?.filter((product) => product?.productId !== productId);
}

function getTotal(cartArr, key) {
  let totalQuantity = 0;
  for (let product in cartArr) {
    totalQuantity += cartArr[product][key];
  }
  return totalQuantity;
}

// Routes
// Endpoint 1: Add an Item to the Cart
cartRouter.get("/add", (req, res) => {
  const productId = parseInt(req.query?.productId);
  const name = req.query?.name;
  const price = parseFloat(req.query?.price);
  const quantity = parseInt(req.query?.quantity);

  errorHandler(res, () => {
    if (isNaN(productId) || isNaN(price) || isNaN(quantity)) {
      throw new HttpError({
        status: 404,
        message: "productId, price and quantity expected as a number",
      });
    }
    const newItem = { productId, name, price, quantity };
    const updatedCart = addItemInCart(cart, newItem);

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      cart: updatedCart,
    });
  });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
cartRouter.get("/edit", (req, res) => {
  const productId = parseInt(req.query?.productId);
  const quantity = parseInt(req.query?.quantity);

  errorHandler(res, () => {
    if (isNaN(productId) || isNaN(quantity)) {
      throw new HttpError({
        status: 404,
        message: "quantity expected as a number",
      });
    }
    const updatedCart = updateCart(cart, "productId", productId, {quantity});

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      cart: updatedCart,
    });
  });
});

// Endpoint 3: Delete an Item from the Cart
cartRouter.get("/delete", (req, res) => {
  const productId = parseInt(req.query?.productId);
  errorHandler(res, () => {
    if (isNaN(productId)) {
      throw new HttpError({
        status: 404,
        message: "productId expected as a number",
      });
    }

    const updatedCart = deleteProduct(cart, productId);

    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      cart: updatedCart,
    });
  });
});

// Endpoint 4: Read Items in the Cart
cartRouter.get("/", (req, res) => {
  errorHandler(res, () => {
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      cart,
    });
  });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
cartRouter.get("/total-quantity", (req, res) => {
  errorHandler(res, () => {
    const totalQuantity = getTotal(cart, "quantity");
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      totalQuantity,
    });
  });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
cartRouter.get("/total-price", (req, res) => {
  errorHandler(res, () => {
    const totalPrice = getTotal(cart, "price");
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      totalPrice,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
