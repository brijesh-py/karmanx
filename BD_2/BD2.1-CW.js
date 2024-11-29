const express = require("express");

const app = express();
const port = 3000;

// person router
const personRouter = express.Router();

// Middleware
app.use("/person", personRouter);

// A person info
const person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
};

// Exercise 1: Return the Person Object
personRouter.get("/", function (req, res) {
  res.status(200).json(person);
});

// Exercise 2: Access the Full Name of the Person
function getFullName() {
  let fullName = person?.firstName + " " + person?.lastName;
  return { fullName };
}

personRouter.get("/fullName", (req, res) => {
  res.status(200).json(getFullName());
});

// Exercise 3: Access Just the First Name and Gender of the Person
function getFirstNameAndGender() {
  const firstNameAndGender = {
    firstName: person?.firstName,
    gender: person?.gender,
  };
  return firstNameAndGender;
}

personRouter.get("/firstname-gender", (req, res) => {
  res.status(200).json(getFirstNameAndGender());
});

// Exercise 4: Increment the Age of the Person and Return the Updated Object
function incrementAge() {
  return { ...person, age: person?.age + 1 };
}

personRouter.get("/increment-age", (req, res) => {
  res.status(200).json(incrementAge());
});

// Exercise 5: Return the Full Name and Membership Status of the Person
function getFullNameAndIsMembership() {
  let fullName = getFullName()?.fullName;
  let fullNameAndIsMembership = {
    fullName,
    isMember: person?.isMember || false,
  };
  return fullNameAndIsMembership;
}

personRouter.get("/fullname-membership", (req, res) => {
  let fullNameAndIsMembership = getFullNameAndIsMembership();
  res.status(200).json(fullNameAndIsMembership);
});

app.listen(port, () => {
  console.log(`Server is running port on ${port}`);
});
