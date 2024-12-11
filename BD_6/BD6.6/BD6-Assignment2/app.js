const express = require("express");
const { getStocks, getStockByTicker, addTrade } = require("./controllers");
const { validateInput } = require("./utils");

const app = express();

app.use(express.json());

// Routes
app.get("/stocks", getStocks);
app.get("/stocks/:ticker", getStockByTicker);
app.post(
  "/trades",
  validateInput([
    ["stockId", "number"],
    ["quantity", "number"],
    ["tradeType", "string"],
    ["tradeDate", "string"],
  ]),
  addTrade
);

module.exports = app;
