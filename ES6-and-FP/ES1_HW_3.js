// Given an array: [5, 12, 7, 25, 18, 3]. Solve the following questions in a nodejs REPL and make your submission.

// WARNING: DON'T NEED TO RUN CODE

const array = [5, 12, 7, 25, 18, 3];

// 1. Write a function that prints the given array.
const printArray = (arr) => {
  console.log(arr); // [5, 12, 7, 25, 18, 3]
};
printArray(array);

// 2. Write a function that returns a new array with 10 added to each number. Use for-loops. Print the result.
const updateArray = (arr) => {
  const updatedArray = arr.map((element) => element + 10);
  for (const element of updatedArray) console.log(element); // [15, 22, 17, 35, 28, 13]
};
updateArray(array);

// 3. Write a function to convert all odd numbers in the array to the nearest even number by adding 1 to them. Print the result. Take the original array as input.
const convertOddNumbersToEvenNumbers = (arr) => {
  const evenNumbersArray = [];
  arr.forEach((element) => {
    if (element % 2 != 0) evenNumbersArray.push(element + 1);
  });
  console.log(evenNumbersArray); // [6, 8, 26, 4]
};
convertOddNumbersToEvenNumbers(array);

// 4. From the given array, create a new array with numbers divisible by 2. Print the new array. Take the original array as input.
const numbersDivisible = (arr) => {
  const array = arr.filter((element) => element % 2 == 0);
  console.log(array); // [12, 18]
};
numbersDivisible(array);

// 5. Write a function to print the sum of all numbers in the array. Take the original array as input.
const sumOfAllNumbers = (arr) => {
  const sumOfNumber = arr.reduce((acc, element) => acc + element);
  console.log(sumOfNumber); // 70
};
sumOfAllNumbers(array);

// 6. Write a function to print the sum of odd numbers and sum of all even numbers in the given array. Take the original array as input.
const sumOfOddNumbers = (arr) => {
  const sumOfNumber = arr.reduce((acc, element) => {
    if (element % 2 != 0) acc += element;
    return acc;
  }, 0);
  console.log(sumOfNumber); // 40
};
sumOfOddNumbers(array);
