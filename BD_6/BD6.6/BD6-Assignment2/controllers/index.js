const { HTTP_STATUS_CODES, HttpError, errorHandler } = require("../utils");
let stocks = [
  { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGL", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

// Exercise 1: Get All Stocks
const getStocks = (req, res) => {
  errorHandler(res, async () => {
    res.status(HTTP_STATUS_CODES.OK).json({
      stocks,
    });
  });
};

// Exercise 2: Get Stock by Ticker
const getStockByTicker = (req, res) => {
  const ticker = req.params.ticker;
  errorHandler(res, async () => {
    const stock = stocks.find((ele) => ele.ticker === ticker);
    if (!stock) {
      throw new HttpError({
        status: HTTP_STATUS_CODES.NOT_FOUND,
        message: `Stock with ticker ${ticker} not found`,
      });
    }
    res.status(HTTP_STATUS_CODES.OK).json({
      stock,
    });
  });
};

// Exercise 3: Add a New Trade
const addTrade = (req, res) => {
  const { tradeType, tradeDate } = req.body;
  const stockId = parseInt(req.body?.stockId);
  const quantity = parseInt(req.body?.quantity);
  errorHandler(res, async () => {
    const trade = { tradeType, tradeDate, stockId, quantity };
    trade.tradeId = trades?.length + 1;
    await trades?.push(trade);
    res.status(HTTP_STATUS_CODES.CREATE).json({
      trade,
    });
  });
};

module.exports = { getStocks, getStockByTicker, addTrade };
