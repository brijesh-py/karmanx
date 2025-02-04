// 1. Write an arrow function that checks if a number is odd. Print the output.
const isNumberOdd = (number) => number % 2 !== 0;
console.log(isNumberOdd(23)); // true

// 2. Write an arrow function that calculates the length of a string. Print the length.
const lengthOfString = (str) => str?.length;
console.log(lengthOfString("Ankita")); // 6

// 3. Write an arrow function that capitalizes a given string. For example: If we pass "hello" as string, the output should be "HELLO". Explore the method in javaScript to convert all letters to capital letters.

const strToUpperCase = (str) => str?.toUpperCase();
console.log(strToUpperCase("hello")); // HELLO

// 4. Write an arrow function that returns the current date in MM/DD/YYYY format. Print the output.
const getCurrentDate = () => new Date().toLocaleDateString();
console.log(getCurrentDate()); // 2/1/2025

// 5. Write an arrow function that returns the current time in HH:MM:SS format. Print the output.
const getCurrentTime = () => new Date().toLocaleTimeString();
console.log(getCurrentTime()); // 12/15/46 PM

// 6. Write an arrow function that converts Fahrenheit to Celsius. Print the output.
const fahrenheitToCelsius = (F) => (((F - 32) * 5) / 9).toFixed(2);
console.log(fahrenheitToCelsius(98.7)); // 37.06

// 7. Write an arrow function that checks if a given string is empty.
//  code for function call
const isEmptyString = (str) => str?.trim() == "";
console.log(isEmptyString("Hello"));
console.log(isEmptyString(""));

// 8. Write an arrow function that returns a random number between 1 and 30. Print the number.
const randomNumber = () => Math.floor(Math.random() * 30);
console.log(randomNumber()); // 20

// 9. Write an arrow function that returns the square root of a random number between 1 and 100. Print the square root. Explore the method in javaScript to find square root.
const squareRootOfRandomNumber = () =>
  Math.sqrt(Math.floor(Math.random() * 100)).toFixed(2);
console.log(squareRootOfRandomNumber()); // 7.55

// 10. Write an arrow function that changes a given string in lower case. For example: If we pass "WORLD" as string, the output should be "world". Explore the method in javaScript to convert all letters to lowercase letters.
const strToLowerCase = (str) => str?.toLowerCase()
console.log(strToLowerCase("WORLD")); // world
