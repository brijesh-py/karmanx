const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());

// Constants
const RESPONSE_OK = 200;

// Utility
function filterHighTemperatures(temperatures, maxValue = 25) {
  const highTemperatures = temperatures.filter(
    (temperature) => temperature > maxValue
  );
  return highTemperatures;
}

function filterLowPrices(prices, maxPrice = 100) {
  const lowPrices = prices.filter((price) => price <= maxPrice);
  return lowPrices;
}

function filterHighRatings(ratings, maxRating = 3.5) {
  const highRatings = ratings.filter((rate) => rate > maxRating);
  return highRatings;
}

function filterLongIndianNames(names, len = 6) {
  const longestNames = names.filter((name) => name.length > len);
  return longestNames;
}

function filterCheaperProducts(productsPrice, maxPrice = 100) {
  const cheaperProductsPrice = productsPrice.filter(
    (price) => price < maxPrice
  );
  return cheaperProductsPrice;
}

// routes
// Question 1:
app.get("/high-temperatures", (req, res) => {
  const temperatures = [22, 26, 19, 30, 23, 28, 17, 31];
  const maxTemperatures = filterHighTemperatures(temperatures, 25);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    maxTemperatures,
  });
});

// Question 2:
app.get("/low-prices", (req, res) => {
  const prices = [80, 120, 95, 150, 60, 110];
  const lowPrices = filterLowPrices(prices, 100);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    lowPrices,
  });
});

// Question 3:
app.get("/high-ratings", (req, res) => {
  const ratings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];
  const highRatings = filterHighRatings(ratings, 3.5);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    highRatings,
  });
});

// Question 4:
app.get("/long-indian-names", (req, res) => {
  const names = ["Akshay", "Priyanka", "Arjun", "Anushka", "Rajesh", "Kavita"];
  const longestNames = filterLongIndianNames(names, 6);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    longestNames,
  });
});

// Question 5:
app.get("/cheaper-products", (req, res) => {
  const maxPrice = parseFloat(req.query?.filterParam);
  const productsPrice = [10, 25, 50, 75, 100, 150, 200];
  const cheaperProductsPrice = filterCheaperProducts(productsPrice, maxPrice);

  res.status(RESPONSE_OK).json({
    status: RESPONSE_OK,
    cheaperProductsPrice,
  });
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
