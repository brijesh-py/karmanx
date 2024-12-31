require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.connect");
const Hotel = require("./models/hotel.model");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

// Get Hotel by Prop
const getRestaurantByProp = (prop) => {
  return async (req, res) => {
    const value = req.params[prop];
    try {
      const hotel = await Hotel.find({ [prop]: value });
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Create a new hotel
app.post("/hotels", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all hotels
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a hotel
app.delete("/hotels/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update  a hotel
app.put("/hotels/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/hotels/:name", getRestaurantByProp("name"));
app.get("/hotels/directory/:phoneNumber", getRestaurantByProp("phoneNumber"));
app.get("/hotels/rating/:rating", getRestaurantByProp("rating"));
app.get("/hotels/category/:category", getRestaurantByProp("category"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
