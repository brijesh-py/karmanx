// 1. Given an array of strings, use `.map()` to return the length of each string in the array.

const words = ["apple", "banana", "kiwi", "orange", "grape"];
const wordsLength = words.map((ele) => ele.length);
console.log(wordsLength);
// Output: [5, 6, 4, 6, 5]

// 2. Given an array of numbers, use `.map()` to square each number.

const numbers = [1, 2, 3, 4, 5];
const squareOfNumbers = numbers.map((num) => num * num);
console.log(squareOfNumbers);
// Output: [1, 4, 9, 16, 25]

// 3. Given an array of strings, use `.map()` to convert each string to uppercase.

const fruits = ["apple", "banana", "kiwi", "orange", "grape"];
const fruitsTrans = fruits.map((fruit) => fruit.toUpperCase());
console.log(fruitsTrans);
// Output: ['APPLE', 'BANANA', 'KIWI', 'ORANGE', 'GRAPE']

// 4. Given an array of numbers, use `.map()` to calculate the square root of each number.

const nums = [4, 9, 16, 25, 36];
const squareRootNumbers = nums.map((num) => Math.sqrt(num));
console.log(squareRootNumbers);
// Output: [2, 3, 4, 5, 6]

// 5. Given an array of strings, use `.map()` to add a prefix to each string.

const prefixFruits = ["apple", "banana", "kiwi", "orange", "grape"];
const addPrefix = prefixFruits.map((fruit) => `fruit-${fruit}`);
console.log(addPrefix);
// Output: ['fruit-apple', 'fruit-banana', 'fruit-kiwi', 'fruit-orange', 'fruit-grape']

// 6. Given an array of numbers, use `.map()` to add 10 to each number.

const numbersArray = [1, 2, 3, 4, 5];
const addNumber = numbersArray.map((num) => num + 10);
console.log(addNumber);
// Output: [11, 12, 13, 14, 15]

// 7. Given an array of numbers, use `.map()` to add the square of each number to that number.

const numsArray = [1, 2, 3, 4, 5];
const addAndSquareNumber = numsArray.map((num) => num * num + num);
console.log(addAndSquareNumber);
// Output: [2, 6, 12, 20, 30]

// 8. Given an array of numbers, use `.map()` to convert each number to its absolute value. Use Math.abs() method.

const numsArr = [-5, 3, -8, 12, -1, 6];
const absNumbers = numsArr.map((num) => Math.abs(num));
console.log(absNumbers);
// Output: [5, 3, 8, 12, 1, 6]

// 9. Given an array of strings, use `.map()` to append the string "!" to each element.

const phrases = ["Hello", "How are you", "Goodbye"];
const addStringInPhrase = phrases.map((str) => str + "!");
console.log(addStringInPhrase);
// Output: ['Hello!', 'How are you!', 'Goodbye!']

// 10. Given an array of strings, use `.map()` to capitalize the third letter of each word.

// const words = ["apple", "banana", "kiwi", "orange", "grape"];
// const capitalizeWord = words.map(
//   (word) => word.slice(0, 2) + word.charAt(2).toUpperCase() + word.slice(3)
// );
// console.log(capitalizeWord);
// Output: [ 'apPle', 'baNana', 'kiWi', 'orAnge', 'grApe' ]
