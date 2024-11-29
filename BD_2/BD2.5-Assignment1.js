const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

//Router
const productRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/products", productRouter);

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST_ERROR = 400;

// Dummy Static Data
const products = [
  {
    id: 1,
    name: "Xiaomi iPhone 12",
    brand: "Xiaomi",
    price: 60000,
    ram: 6,
    rom: 256,
    rating: 4.5,
    os: "Android",
    camera: 108,
  },
  {
    id: 2,
    name: "Oppo Mi 10",
    brand: "Xiaomi",
    price: 30000,
    ram: 6,
    rom: 512,
    rating: 4,
    os: "iOS",
    camera: 64,
  },
  {
    id: 3,
    name: "Samsung Mi 10",
    brand: "Oppo",
    price: 20000,
    ram: 4,
    rom: 256,
    rating: 4,
    os: "Android",
    camera: 24,
  },
  {
    id: 4,
    name: "Apple Find X2",
    brand: "Samsung",
    price: 60000,
    ram: 8,
    rom: 512,
    rating: 4.5,
    os: "iOS",
    camera: 48,
  },
  {
    id: 5,
    name: "Oppo Mi 11",
    brand: "Xiaomi",
    price: 30000,
    ram: 12,
    rom: 128,
    rating: 4,
    os: "iOS",
    camera: 24,
  },
  {
    id: 6,
    name: "OnePlus Find X3",
    brand: "Apple",
    price: 30000,
    ram: 12,
    rom: 64,
    rating: 4,
    os: "Android",
    camera: 64,
  },
  {
    id: 7,
    name: "Apple Pixel 5",
    brand: "Apple",
    price: 70000,
    ram: 4,
    rom: 512,
    rating: 4.5,
    os: "iOS",
    camera: 24,
  },
  {
    id: 8,
    name: "Google Mi 10",
    brand: "Oppo",
    price: 30000,
    ram: 8,
    rom: 64,
    rating: 5,
    os: "iOS",
    camera: 108,
  },
  {
    id: 9,
    name: "Oppo Mi 11",
    brand: "Samsung",
    price: 30000,
    ram: 4,
    rom: 64,
    rating: 4,
    os: "Android",
    camera: 24,
  },
  {
    id: 10,
    name: "Xiaomi Mi 10",
    brand: "Oppo",
    price: 60000,
    ram: 16,
    rom: 512,
    rating: 4.5,
    os: "Android",
    camera: 12,
  },
  {
    id: 11,
    name: "OnePlus Pixel 5",
    brand: "Apple",
    price: 60000,
    ram: 12,
    rom: 64,
    rating: 5,
    os: "Android",
    camera: 12,
  },
  {
    id: 12,
    name: "Xiaomi OnePlus 8",
    brand: "Xiaomi",
    price: 70000,
    ram: 8,
    rom: 64,
    rating: 4.5,
    os: "Android",
    camera: 48,
  },
  {
    id: 13,
    name: "Xiaomi Pixel 6",
    brand: "Oppo",
    price: 30000,
    ram: 4,
    rom: 64,
    rating: 5,
    os: "Android",
    camera: 108,
  },
  {
    id: 14,
    name: "Samsung Find X2",
    brand: "Oppo",
    price: 40000,
    ram: 12,
    rom: 512,
    rating: 4.7,
    os: "Android",
    camera: 48,
  },
  {
    id: 15,
    name: "Google OnePlus 8",
    brand: "Apple",
    price: 20000,
    ram: 16,
    rom: 64,
    rating: 5,
    os: "iOS",
    camera: 24,
  },
  {
    id: 16,
    name: "OnePlus iPhone 12",
    brand: "OnePlus",
    price: 20000,
    ram: 6,
    rom: 128,
    rating: 4.5,
    os: "iOS",
    camera: 64,
  },
  {
    id: 17,
    name: "Google Mi 11",
    brand: "Oppo",
    price: 70000,
    ram: 6,
    rom: 64,
    rating: 4,
    os: "Android",
    camera: 64,
  },
  {
    id: 18,
    name: "Google OnePlus 9",
    brand: "Apple",
    price: 20000,
    ram: 4,
    rom: 64,
    rating: 5,
    os: "Android",
    camera: 64,
  },
  {
    id: 19,
    name: "Oppo Galaxy S22",
    brand: "Samsung",
    price: 20000,
    ram: 16,
    rom: 256,
    rating: 4.7,
    os: "Android",
    camera: 12,
  },
  {
    id: 20,
    name: "Apple Pixel 5",
    brand: "Oppo",
    price: 40000,
    ram: 8,
    rom: 128,
    rating: 4.7,
    os: "Android",
    camera: 108,
  },
];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedProductByPopularity(products, isAscend = true) {
  if (isAscend) {
    return structuredClone(products).sort((p1, p2) => p1?.rating - p2?.rating);
  }
  return structuredClone(products).sort((p1, p2) => p2?.rating - p1?.rating);
}

function getSortedProductsByPrice(products, isAscend = true) {
  if (isAscend) {
    return structuredClone(products).sort((p1, p2) => p1?.price - p2?.price);
  }
  return structuredClone(products).sort((p1, p2) => p2?.price - p1?.price);
}

function getFilteredProductsByRam(products, ram = 4) {
  const sortedProducts = products?.filter((product) => product?.ram === 8);
  return sortedProducts;
}

function getFilteredProductsByRom(products, rom = 4) {
  const sortedProducts = products?.filter((product) => product?.rom === rom);
  return sortedProducts;
}

function getFilteredProductsByBrand(products, brand) {
  const sortedProducts = products?.filter(
    (product) => product?.brand?.toLowerCase() === brand?.toLowerCase()
  );
  return sortedProducts;
}

function getFilteredProductsByOS(products, os) {
  const sortedProducts = products?.filter(
    (product) => product?.os?.toLowerCase() === os?.toLowerCase()
  );
  return sortedProducts;
}

function getFilteredProductsByPrice(products, price) {
  const sortedProducts = products?.filter((product) => product?.price <= price);
  return sortedProducts;
}

// Routes
// Endpoint 1: Get the products sorted by popularity
productRouter.get("/sort/popularity", (req, res) => {
  try {
    const sortedProducts = getSortedProductByPopularity(products, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 2: Get the products sorted by “high-to-low” price
productRouter.get("/sort/price-high-to-low", (req, res) => {
  try {
    const sortedProducts = getSortedProductsByPrice(products, false);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 3: Get the products sorted by “low-to-high” price
productRouter.get("/sort/price-low-to-high", (req, res) => {
  try {
    const sortedProducts = getSortedProductsByPrice(products);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 4: Filter the products based on the “RAM” option.
productRouter.get("/filter/ram", (req, res) => {
  const ram = parseInt(req.query?.ram);
  try {
    if (isNaN(ram)) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "Invalid ram parameter",
      });
    }

    const sortedProducts = getFilteredProductsByRam(products, ram);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 5: Filter the products based on the “ROM” option.
productRouter.get("/filter/rom", (req, res) => {
  const rom = parseInt(req.query?.rom);
  try {
    if (isNaN(rom)) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "Invalid rom parameter",
      });
    }
    const sortedProducts = getFilteredProductsByRom(products, rom);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 6: Filter the products based on the “Brand” option.
productRouter.get("/filter/brand", (req, res) => {
  const { brand } = req.query;
  try {
    if (!brand) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "Brand name is required",
      });
    }
    const sortedProducts = getFilteredProductsByBrand(products, brand);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 7: Filter the products based on the “OS” option.
productRouter.get("/filter/os", (req, res) => {
  const { os } = req.query;
  try {
    if (!os) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "Os name is required",
      });
    }
    const sortedProducts = getFilteredProductsByOS(products, os);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 8: Filter the products based on the “Price” option.
productRouter.get("/filter/price", (req, res) => {
  const price = parseFloat(req.query?.price);
  try {
    if (isNaN(price)) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "Invalid price parameter",
      });
    }

    const sortedProducts = getFilteredProductsByPrice(products, price);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products: sortedProducts,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 8: Send original array of products
productRouter.get("/", (req, res) => {
  try {
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      products,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
