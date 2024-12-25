const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const photoRouter = require("./routes/photo.route");
const sequelize = require("../config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sync all models
sequelize
  .sync({ force: false }) // Set force: true to drop and recreate tables (be cautious with this)
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Routes
app.use("/api", userRouter);
app.use("/api", photoRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Pictoria is working!",
  });
});

module.exports = app;
