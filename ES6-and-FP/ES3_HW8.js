// 1. Write a function `displayWeather` that uses template literals to display the weather forecast for a given city and temperature.
const displayWeather = (city, celsius) =>
  `The weather in ${city} is ${celsius} degrees Celsius.`;

console.log(displayWeather("New York", 20));
// Output: The weather in New York is 20 degrees Celsius.

console.log(displayWeather("London", 15));
// Output: The weather in London is 15 degrees Celsius.

// 2. Write a function `formatCurrency` that uses template literals to format a currency amount with a specified currency code.
const formatCurrency = (amount, currencyCode) =>
  `You have ${amount} ${currencyCode}.`;
console.log(formatCurrency(50.5, "USD")); // Output: You have 50.5 USD.

console.log(formatCurrency(100, "EUR")); // Output: You have 100 EUR.

// 3. Write a function `displayBookSummary` that uses template literals to display a summary of a book, including its title, author, and genre.
const displayBookSummary = (bookName, author, genre) => {
  return `The book "${bookName}" written by ${author} belongs to the ${genre} genre`;
};
console.log(
  displayBookSummary("To Kill a Mockingbird", "Harper Lee", "Fiction")
);
// Output: The book "To Kill a Mockingbird" written by Harper Lee belongs to the Fiction genre.

// 4. Write a function `displayMovieInfo` that uses template literals to display information about a movie, including its title, release year, and director.
const displayMovieInfo = (movieName, releaseDate, director) => {
  return `The movie "${movieName}" was released in ${releaseDate} and directed by ${director}`;
};
console.log(displayMovieInfo("Inception", 2010, "Christopher Nolan"));
// Output: The movie "Inception" was released in 2010 and directed by Christopher Nolan.

// 5. Write a function `constructEmail` that uses template literals to construct an email with a subject and recipient.
const constructEmail = (email, subject) => {
  console.log(`To: ${email} \nSubject: ${subject} \nDear ${email}`);
};
console.log(constructEmail("alice@example.com", "Meeting Reminder"));

// Expected Output should be in the following format with proper line spaces as shown below:

// To: alice@example.com
// Subject: Meeting Reminder

// Dear alice@example.com,

// ...

// 6. Write a function that uses template literals and ternary operator to display a message based on a condition. Passing score is 60 and above. Syntax for ternary operator- (condition) ? true-value : false-value
const assessGrade = (marks) =>
  marks >= 60 ? "You are passing." : "You are failing.";
console.log(assessGrade(75)); // Output: You are passing.

console.log(assessGrade(60)); // Output: You are passing.

console.log(assessGrade(45)); // Output: You are failing.

// 7. Write a function that uses template literals and ternary operator to concatenate strings with numeric values.
const showMessage = (item, quantity) =>
  `You have ${quantity} bangle${quantity > 1 ? "s" : ""}.`;
console.log(showMessage("bangle", 10)); // Output: You have 10 bangles.

console.log(showMessage("lipstick", 1)); // Output: You have 1 lipstick.

// 8. Write a function that uses template literals and ternary operator to display a message based on a condition. Passing score is 60 and grade should be A.
const assessMarks = (marks, grade) =>
  marks >= 60 && grade == "A" ? "You are passing." : "You are failing.";
console.log(assessMarks(95, "A")); // Output: You are passing.

console.log(assessMarks(62, "C")); // Output: You are failing.

console.log(assessMarks(45, "D")); // Output: You are failing.

// 9. Write a function that uses template literals and ternary operator to show proper message. If a person has more than 10 bangles and more than 5 lipsticks then show the message - "You have a good collection." For others show the message - "You need to update your collection."
const showMsg = (bangle, bangleQ, lipstick, lipstickQ) => {
  return bangleQ > 10 && lipstickQ > 5
    ? "You have a good collection."
    : "You need to update your collection.";
};
console.log(showMsg("bangle", 11, "lipstick", 6)); // Output: You have a good collection.

console.log(showMsg("bangle", 5, "lipstick", 1)); // Output: You need to update your collection.

console.log(showMsg("bangle", 12, "lipstick", 4)); // Output: You need to update your collection.

// 10. Write a function that uses template literals and ternary operator to show proper message. If a person has more than 10 pencils and more than 5 erasers or if they have more than 10 erasers and more than 5 pencils then show the message - "Please share stationery with friends." For others show the message - "Please ask your friends for stationery."
const shareStationeryMessage = (pencils, erasers) => {
  return (pencils > 10 && erasers > 5) || (erasers > 10 && pencils > 5)
    ? "Please share stationery with friends"
    : "Please ask your friends for stationery";
};
console.log(shareStationeryMessage(12, 8)); // Output: Please share stationery with friends.

console.log(shareStationeryMessage(7, 15)); // Output: Please share stationery with friends.

console.log(shareStationeryMessage(5, 3)); // Output: Please ask your friends for stationery.
