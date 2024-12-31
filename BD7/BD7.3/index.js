require("dotenv").config();
const connect = require("./db/db.connect");
const Hotel = require("./models/hotel.model");
const Restaurant = require("./models/restaurant.model");

connect();
const getHotels = async () => {
  const res = await Hotel.find();
  console.log(res);
};
// getHotels();

const updateHotelById = async (id, values) => {
  const res = await Hotel.findByIdAndUpdate(id, values, { new: true });
  console.log(res);
  console.log("Updated");
};
// updateHotelById("676fa62353b7cda962f6945f", { checkOutTime: "11 AM" });

const updateHotelByProps = async (key, values) => {
  const res = await Hotel.findOneAndUpdate(key, values, { new: true });
  console.log(res);
  console.log("Updated");
};
// updateHotelByProps(
//   { phoneNumber: "+1299655890" },
//   { phoneNumber: "+1997687392" }
// );

const deleteHotelById = async (id) => {
  const res = await Hotel.findByIdAndDelete(id);
  console.log(res);
  console.log("Deleted");
};

// deleteHotelById("676fa68d2f523083330611ba");

const deleteHotelByPhoneNumber = async (phoneNumber) => {
  const res = await Hotel.findOneAndDelete({ phoneNumber });
  console.log(res);
  console.log("Deleted");
};

deleteHotelByPhoneNumber("+1234555890");
