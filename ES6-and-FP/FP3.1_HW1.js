// 1. Given an array of strings, find the longest word using `.reduce()`.

const words = ["apple", "banana", "kiwi", "orange", "grape"];
console.log(
  words.reduce((acc, ele) => (acc.length < ele.length ? (acc = ele) : acc))
);
// Output: banana

// 2. Given an array of numbers, find the minimum using `.reduce()`.

const numbers = [10, 5, 8, 20, 15];
console.log(numbers.reduce((acc, ele) => (acc > ele ? (acc = ele) : acc)));
// Output: 5

// 3. Given an array of strings, find the total length of all strings using `.reduce()`.

const wordsLength = ["apple", "banana", "kiwi", "orange", "grape"];
console.log(wordsLength.reduce((acc, ele) => (acc += ele.length), 0));
// Output: 26

// 4. Given an array of numbers, count the number of even numbers using `.reduce()`.

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(nums.reduce((acc, ele) => (ele % 2 === 0 ? acc + 1 : acc), 0));
// Output: 5

// 5. Given an array of strings, capitalize the first letter of each word and concatenate them into a single string using `.reduce()`.

const wordsCaps = ["hello", "world", "how", "are", "you"];
console.log(
  wordsCaps.reduce(
    (acc, ele) =>
      acc.charAt(0).toUpperCase() +
      acc.slice(1) +
      " " +
      ele.charAt(0).toUpperCase() +
      ele.slice(1)
  )
);

// Output: Hello World How Are You

// 6. Given an array of numbers, calculate the average of the numbers using .reduce()

const numsAvg = [10, 15, 20, 25, 30];
const average = numsAvg.reduce((acc, ele) => acc + ele, 0) / numsAvg.length;
console.log(average);

// Output: 20

// 7. Given an array of numbers, find the sum of square of each number using `.reduce()`.

const numbers2 = [1, 2, 3, 4, 5];
console.log(numbers2.reduce((acc, ele) => (acc += ele * ele), 0));
// Output: 55

// 8. Given an array of strings, create an object with the occurrences of words using `.reduce()`.

const stationeryWords = [
  "pen",
  "notebook",
  "eraser",
  "notebook",
  "pencil",
  "notebook",
  "pencil",
];
console.log(
  stationeryWords.reduce((acc, ele) => {
    acc[ele] ? (acc[ele] = acc[ele] + 1) : (acc[ele] = 1);
    return acc;
  }, {})
);

// Output: { pen: 1, notebook: 3, eraser: 1, pencil: 2 }

// 9. Given an array of strings, create an object with the occurrences of words using `.reduce()`. The keys should be the first letter of each word.

const wordsLetter = ["apple", "banana", "kiwi", "orange", "grape"];
console.log(
  wordsLetter.reduce((acc, ele) => {
    const letter = ele[0];
    acc[letter] ? (acc[letter] = acc[letter] + 1) : (acc[letter] = 1);
    return acc;
  }, {})
);
// Output: { a: 1, b: 1, k: 1, o: 1, g: 1 }

// 10. Given an array of numbers, find the product of positive numbers using `.reduce()`.

const numPositive = [-2, 3, 4, -5, 6];
console.log(
  numPositive.reduce((acc, ele) => (ele > 0 ? (acc *= ele) : acc), 1)
);

// // Output: 72
