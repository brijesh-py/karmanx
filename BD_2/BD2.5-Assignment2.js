const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

//Router
const stocksRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/stocks", stocksRouter);

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST_ERROR = 400;

// Dummy Static Data
const stocks = [
  {
    id: 1,
    name: "reliance industries",
    price: 2500,
    growth: 3.5,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 2,
    name: "hdfc bank",
    price: 1800,
    growth: 4.2,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 3,
    name: "icici bank",
    price: 1600,
    growth: 5.1,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 4,
    name: "tata consultancy services",
    price: 3200,
    growth: 2.9,
    industry: "finance",
    exchange: "bse",
    price: 1900,
  },
  {
    id: 5,
    name: "infosys",
    price: 2900,
    growth: 3.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 7,
    name: "sun pharmaceutical",
    price: 2300,
    growth: 3.2,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 8,
    name: "cipla",
    growth: 2.6,
    price: 2100,
    exchange: "bse",
    industry: "pharma",
  },
  {
    id: 9,
    name: "ntpc",
    price: 1200,
    growth: 4.1,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 10,
    name: "power grid corporation",
    price: 1500,
    growth: 3.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 11,
    name: "adani power",
    price: 2200,
    growth: 5.3,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 12,
    name: "lupin",
    price: 2000,
    growth: 4.5,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 13,
    name: "axis bank",
    price: 1750,
    growth: 2.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 14,
    name: "state bank of india",
    price: 1450,
    growth: 3.6,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 15,
    name: "bajaj finance",
    price: 2650,
    growth: -2.9,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 17,
    name: "biocon",
    price: 1850,
    growth: 3.9,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 18,
    name: "torrent power",
    price: 1600,
    growth: 2.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 19,
    name: "tata power",
    price: 1750,
    growth: 4.0,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 20,
    name: "jsw energy",
    price: 1450,
    growth: 3.1,
    industry: "power",
    exchange: "bse",
  },
];
const stocksClone = structuredClone(stocks) || [];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedStocksByPrice(stocksClone, isAscend = true) {
  if (isAscend) {
    return stocksClone.sort((s1, s2) => s1?.price - s2?.price);
  }
  return stocksClone.sort((s1, s2) => s2?.price - s1?.price);
}

function getSortedStocksByGrowth(stocksClone, isAscend = true) {
  if (isAscend) {
    return stocksClone.sort((s1, s2) => s1?.growth - s2?.growth);
  }
  return stocksClone.sort((s1, s2) => s2?.growth - s1?.growth);
}

function getFilteredStocks(stocksClone, { exchange, industry }) {
  if (exchange) {
    return stocksClone.filter(
      (stock) => stock?.exchange?.toLowerCase() === exchange?.toLowerCase()
    );
  }

  if (industry) {
    return stocksClone.filter(
      (stock) => stock?.industry?.toLowerCase() === industry?.toLowerCase()
    );
  }
  return [];
}

// Routes
// Endpoint 1: Get the stocks sorted by pricing
stocksRouter.get("/sort/pricing", (req, res) => {
  const pricing = req.query?.pricing === "low-to-high";
  try {
    const sortedStocks = getSortedStocksByPrice(stocksClone, pricing);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      stocks: sortedStocks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 2: Get the stocks sorted based on their Growth.
stocksRouter.get("/sort/growth", (req, res) => {
  const growth = req.query?.growth === "low-to-high";
  try {
    const sortedStocks = getSortedStocksByGrowth(stocksClone, growth);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      stocks: sortedStocks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 3: Filter the stocks based on the 2 Stock Exchange (NSE. and BSE)
stocksRouter.get("/filter/exchange", (req, res) => {
  const exchange = req.query?.exchange;
  try {
    if (!exchange) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "exchange query is required",
      });
    }

    const sortedStocks = getFilteredStocks(stocksClone, { exchange });

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      stocks: sortedStocks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 4: Filter the stocks based on the Industrial Sector.
stocksRouter.get("/filter/industry", (req, res) => {
  const industry = req.query?.industry;
  try {
    if (!industry) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "industry query is required",
      });
    }

    const sortedStocks = getFilteredStocks(stocksClone, { industry });

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      stocks: sortedStocks,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 5: Send all available stocks
stocksRouter.get("/", (req, res) => {
  try {
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      stocks: stocksClone,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
