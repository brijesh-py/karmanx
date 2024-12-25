require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileRouter = require("./routes/file-router");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/src/uploads", express.static("src/uploads"));
app.use("/files", fileRouter);
app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Welcome to the file upload API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
