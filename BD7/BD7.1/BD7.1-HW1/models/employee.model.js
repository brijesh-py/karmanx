const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  idNo: {
    type: Number,
    require: true,
  },
  dob: {
    type: Date,
  },
  mail: {
    type: String,
    require: true,
  },
  telNo: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
