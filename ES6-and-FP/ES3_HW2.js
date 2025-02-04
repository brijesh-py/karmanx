// 1. Write an arrow function that uses the rest parameter to log the first element and the rest of the elements in an array.

//    // code for function call
const logFirstAndRest = (num1, ...args) => {
  console.log("First:", num1);
  console.log("Rest:", args);
};
logFirstAndRest(1, 2, 3, 4, 5);
// Expected Output:
//      First: 1
//      Rest: [2, 3, 4, 5]

// 2. Write an arrow function that uses the rest parameter to log the first and second element and the rest of the elements in an array.

//    // code for function call
const logFirstAndSecond = (num1, num2, ...args) => {
  console.log("First:", num1);
  console.log("Second:", num2);
  console.log("Rest:", args);
};
logFirstAndSecond(12, 22, 33, 44, 55);
// Expected Output:
//      First: 12
//      Second: 22
//      Rest: [33, 44, 55]
// 3. Write an arrow function that uses the rest parameter to calculate the product of numeric values.

// code for function call
const calculateProduct = (...args) => args.reduce((acc, num) => acc * num, 1);
console.log(calculateProduct(2, 3, 4)); // Output: 24
console.log(calculateProduct(5, 2, 1, 3)); // Output: 30

// 4. Write an arrow function that uses the rest parameter to concatenate an arbitrary number of words into a sentence.

// code for function call
const createSentence = (...args) => args.join(" ");
console.log(createSentence("JavaScript", "is", "awesome")); // Output: JavaScript is awesome

// 5. Write an arrow function that uses the rest parameter to calculate the sum of numeric values.

// code for function call
const findSum = (message, ...args) => {
  const sumOfNumbers = args.reduce((acc, num) => acc + num, 0);
  console.log(`${message}${sumOfNumbers}`);
};
findSum("Sum of Numbers: ", 2, 4, 6, 8, 10);
// Output: Sum of Numbers:  30

// 6. Write an arrow function that uses the rest parameter to check if a specific value is present in an array. The first parameter that the function takes is the value that you have to find in the array.

// code for function call
const containsValue = (value, ...args) =>
  args.find((ele) => ele === value) ? true : false;
console.log(containsValue(3, 1, 2, 3, 4)); // Output: true
console.log(containsValue("apple", "banana", "orange")); // Output: false

// 7. Write an arrow function that uses the rest parameter to find the average of an arbitrary number of numeric values.

// code for function call
const calculateAverage = (...args) => {
  const sumOfNumbers = args.reduce((acc, num) => acc + num, 0);
  return sumOfNumbers / args.length;
};
console.log(calculateAverage(10, 5, 15)); // Output: 10
console.log(calculateAverage(2, 4, 6, 8)); // Output: 5
