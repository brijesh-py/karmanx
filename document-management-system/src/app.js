const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
  });
});

module.exports = app;
