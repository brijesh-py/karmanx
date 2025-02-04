// 1. Write an arrow function with two parameters that calculates the area of a rectangle. Print the output.

const areaOfRectangle = (length, width) => length * width;
console.log(areaOfRectangle(12, 12)); // 144

// 2. Write an arrow function with two parameters 15 and 5, that checks if the first number is divisible by the second number. Print the output.

const divisibleNumber = (num1, num2) => num1 % num2 == 0;
console.log(divisibleNumber(15, 5)); // true

// 3. Write an arrow function with two parameters 15 and 5, that calculates the difference of the two numbers. Print the output.

const difference = (num1, num2) => num1 - num2;
console.log(difference(15, 5)); // 10

// 4. Write an arrow function with three parameters that concatenates three strings. Your Output should be: I am happy.

const concatenatesString = (str1, str2, str3) => str1 + str2 + str3;
console.log(concatenatesString("I", " am ", " happy.")); // I am happy.

// 5. Convert the below arrow function into traditional function declaration format?

const isBigger = (a, b) => a > b;
function isBigger(a, b) {
  return a > b;
}
console.log("Is 2 bigger than 3?", isBigger(2, 3));

// 6. Convert the below function into an arrow function?

function printProduct(a, b) {
  return a * b;
}
const printProduct = (a, b) => a * b;

console.log("Product of two numbers: ", printProduct(2, 6)); // Product of two numbers: 12

// 7. Convert the below function into an arrow function?
function getGreeting(greeting, name) {
  return greeting + name;
}
const getGreeting = (greeting, name) => greeting + name;
console.log(getGreeting("Hello, ", "John")); // Hello, John
