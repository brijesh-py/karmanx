const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// constant data
const taxRate = 5; // 5%
const discountPercentage = 10; //10%
const loyaltyRate = 2; // 2 points per 1$

// Default API Endpoint
function defaultRoute(req) {
  let hostName = "https://" + req.hostname;
  let cartTotalRoute = hostName + "/cart-total?newItemPrice=1200&cartTotal=0";
  let membershipDiscountRoute =
    hostName + "/membership-discount?cartTotal=3600&isMember=true";
  let calculateTaxRoute = hostName + "/calculate-tax?cartTotal=3600";
  let estimateDeliveryRoute =
    hostName + "/estimate-delivery?shippingMethod=express&distance=600";
  let shippingCostRoute = hostName + "/shipping-cost?weight=2&distance=600";
  let loyaltyPointsRoute = hostName + "/loyalty-points?purchaseAmount=3600";
  let routes = {
    cartTotal: cartTotalRoute,
    membershipDiscount: membershipDiscountRoute,
    calculateTax: calculateTaxRoute,
    estimateDelivery: estimateDeliveryRoute,
    shippingCost: shippingCostRoute,
    loyaltyPoints: loyaltyPointsRoute,
  };
  return routes;
}

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    routes: { ...defaultRoute(req) },
  });
});

// Endpoint 1: Calculate the total price of items in the cart
function getTotalPriceOfItems(newItemPrice, cartTotal) {
  let totalPriceOfItems = newItemPrice + cartTotal;
  return totalPriceOfItems.toString();
}

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query?.newItemPrice);
  let cartTotal = parseFloat(req.query?.cartTotal);
  res.send(getTotalPriceOfItems(newItemPrice, cartTotal));
});

// Endpoint 2 : Apply a discount based on membership status
function getMembershipDiscount(cartTotal, isMember) {
  let discountPrice = cartTotal;
  if (isMember) {
    discountPrice = (cartTotal / 100) * discountPercentage;
  }
  let totalPrice = cartTotal - discountPrice;
  return totalPrice.toString();
}

app.get("/membership-discount", function (req, res) {
  let cartTotal = parseFloat(req.query?.cartTotal);
  let isMember = req.query?.isMember === "true";
  res.send(getMembershipDiscount(cartTotal, isMember));
});

// Endpoint 3 : Calculate tax on the cart total
function calculateTaxOnCartTotal(cartTotal) {
  let taxOnCartTotal = (cartTotal / 100) * taxRate;
  return taxOnCartTotal.toString();
}

app.get("/calculate-tax", function (req, res) {
  let cartTotal = parseFloat(req.query?.cartTotal);

  res.send(calculateTaxOnCartTotal(cartTotal));
});

// Endpoint 4 : Estimate delivery time based on shipping method
const estimateDeliveryTime = (shippingMethod, distance) => {
  let result = parseInt(distance / 100);
  if (shippingMethod === "standard") {
    result = parseInt(distance / 50);
  }
  return result.toString();
};

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query?.shippingMethod;
  let distance = parseFloat(req.query?.distance);

  res.send(estimateDeliveryTime(shippingMethod, distance));
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query?.weight);
  let distance = parseFloat(req.query?.distance);

  res.send(calculateShippingCost(weight, distance));
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints.toString();
}

app.get("/loyalty-points", function (req, res) {
  let purchaseAmount = parseFloat(req.query?.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
