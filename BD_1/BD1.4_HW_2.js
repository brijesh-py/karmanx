const express = require("express");
const { resolve } = require("path");

const app = express();
const port = 3000;

// Exercise: BD1.4_HW_2

// 1.4.2.1
function generateProfileUrl(username) {
  let url = "https://github.com/" + username;
  return url;
}
// Endpoint 1
app.get("/github-profile", (req, res) => {
  let username = req.query?.username;
  res.send(generateProfileUrl(username));
});

// 1.4.2.2
function generateCertificate(firstName, lastName, courseName) {
  let certificate =
    "This certification awarded to " +
    firstName +
    " " +
    lastName +
    " for completing the course " +
    courseName;
  return certificate;
}
// Endpoint 2
app.get("/certificate", (req, res) => {
  let firstName = req.query?.firstName;
  let lastName = req.query?.lastName;
  let courseName = req.query?.courseName;
  res.send(generateCertificate(firstName, lastName, courseName));
});

// 1.4.2.3
function calculateGrade(math, science, english) {
  let gradeInPercentage = ((math + science + english) / 300) * 100;
  return "Your grade is percentage is " + gradeInPercentage + "%";
}
// Endpoint 3
app.get("/grade", (req, res) => {
  let math = parseFloat(req.query?.math);
  let science = parseFloat(req.query?.science);
  let english = parseFloat(req.query?.english);

  res.send(calculateGrade(math, science, english));
});

// 1.4.2.4
function splitBill(billAmount, numberOfFriends) {
  let splitAmount = billAmount / numberOfFriends;
  return "Result: Each friend owes Rs. " + splitAmount + " against the bill";
}

// Endpoint 4
app.get("/split-bill", (req, res) => {
  let billAmount = parseFloat(req.query?.billAmount);
  let numberOfFriends = parseInt(req.query?.numberOfFriends);

  res.send(splitBill(billAmount, numberOfFriends));
});

// 1.4.2.5
function calculateSalary(totalHours, hourlyWage) {
    let monthlySalary = hourlyWage * totalHours;
    return "Result: Your monthly salary is ₹" + monthlySalary;
}

// Endpoint 5
app.get("/monthly-salary", (req, res) => {
  let totalHours = parseFloat(req.query?.totalHours);
  let hourlyWage = parseFloat(req.query?.hourlyWage);

  res.send(calculateSalary(totalHours, hourlyWage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
