const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

// default route
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to Movie API",
  });
});

module.exports = app;
