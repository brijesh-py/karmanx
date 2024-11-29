const express = require("express");
const { resolve } = require("path");

const app = express();
const port = 3010;

app.get("/", (req, res) => {
  res.send("All working is right");
});

// Exercise: BD1.4_HW_1
// 1.4.1.1
// Function to return a Welcome message
function getWelcomeMessage() {
  let message = "We will now learn Functions!";
  return message;
}

// Endpoint 1: Return a welcome message
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage());
});

// 1.4.1.2
// Function take username as a parameter and return greeting message
function getGreetingMessage(username) {
  let message =
    "Hey, " + username + "! Are you ready to learn functions with us?";
  return message;
}
// Endpoint 2: Take a username and return greeting message
app.get("/greet", (req, res) => {
  let username = req.query?.username;
  res.send(getGreetingMessage(username));
});

// 1.4.1.3
// Function take years of experience as parameter and return message
function checkYearsOfExp(years) {
  if (years > 0) {
    return "You have some experience with functions. Great!";
  }
  return "No worries. You will start writing functions in no time!";
}

// Endpoint 3: Take the years of experience in functions and return a message
app.get("/message", (req, res) => {
  let yearsOfExp = req.query?.yearsOfExp;
  res.send(checkYearsOfExp(yearsOfExp));
});

// 1.4.1.4
// Function to return the time the student can dedicate to learn functions
function getTime(hours, days) {
  return (hours * days).toString();
}
// Endpoint 4: Take hours per day and days in a week that the student can dedicate to learn functions and find time
app.get("/hours", (req, res) => {
  let hours = parseFloat(req.query?.hours);
  let days = parseInt(req.query?.days);

  res.send(getTime(hours, days));
});

// 1.4.1.5
// Function to return the  modules completion message
function getModuleCompletion(username, hasCompleted) {
  if (hasCompleted) {
    return username + " has completed the modules";
  }
  return username + " has not completed the modules";
}

// Endpoint 5: Take a username and a boolean indicating module completion status, return a message if the student has completed the module or not
app.get("/module-completion-status", (req, res) => {
  let username = req.query?.username;
  let hasCompleted = req.query?.hasCompleted === "true";

  res.send(getModuleCompletion(username, hasCompleted));
});

// 1.4.1.6
// Function take name and city , return greeting message
function getPersonalizedGreeting(name, city) {
  let message = "Hey, " + name + "! What is famous about " + city + "?";
  return message;
}

// Endpoint 6: Take a student's name and city, return personalized greeting message
app.get("/personalized-greeting", (req, res) => {
  let name = req.query?.name;
  let city = req.query?.city;
  res.send(getPersonalizedGreeting(name, city));
});

// 1.4.1.7
// Function to find the age birth year
function findAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}

// Endpoint 7: Take the birth year of the student and return the age
app.get("/find-age", (req, res) => {
  let birthYear = parseFloat(req.query?.birthYear);
  res.send(findAge(birthYear).toString());
});

// 1.4.1.8
// Function take hours and days parameter and, return the time
function findRequiredTime(hours, days) {
  let time = hours * days;
  if (time >= 30) {
    return "The time being dedicated is sufficient for learning functions.";
  }
  return "The time being dedicated is not sufficient for learning functions";
}

// Endpoint 8: Take the days per week and hours per day a student can dedicate to learn functions and return whether it is sufficient (>= 30)
app.get("/is-time-sufficient", (req, res) => {
  let hours = parseFloat(req.query?.hours);
  let days = parseInt(req.query?.days);
  res.send(findRequiredTime(hours, days));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
