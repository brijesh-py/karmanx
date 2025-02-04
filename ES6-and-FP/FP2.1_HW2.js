// 1. Given an array of numbers, filter the even numbers into a new array.

const nums = [12, 5, 20, 7, 8, 15, 30];
const newNums = nums.filter((num) => num % 2 === 0);
console.log(newNums);

// 2. Given an array of strings, filter the strings that have length greater than 5 into a new array.

const words = ["kiwi", "mango", "apple", "orange", "banana"];
const newWords = words.filter((w) => w.length > 5);
console.log(newWords);
// 3. Given an array of strings, filter the strings that start with letter 'S' into a new array. Explore .startsWith() method.

const words2 = ["Sun", "Moon", "Star", "Planet", "Saturn"];
const newWords2 = words2.filter((w) => w.startsWith("S"));
console.log(newWords2);
// 4. Given an array of numbers, filter the numbers that are not multiples of 3 into a new array.

const threeMultiples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newThreeMultiples = threeMultiples.filter((num) => num % 3 !== 0);
console.log(newThreeMultiples);
// 5. Given an array of numbers, filter the numbers divisible by both 7 and 3 into a new array.

const numbs = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const newNumbs = numbs.filter((num) => num % 7 === 0 && num % 3 === 0);
console.log(newNumbs);
// 6. Given an array of strings, filter the strings that are in lowercase into a new array.

const words3 = ["APPLE", "banana", "KIWI", "orange", "GRAPE"];
const newWords3 = words3.filter((w) => w === w.toLowerCase());
console.log(newWords3);
// 7. Given an array of strings, filter the strings that do not contain with the letter 'a' in them.

const wordsY = ["happy", "sad", "sunny", "cloudy", "rainy"];
const newWordsY = wordsY.filter((w) => !w.includes("a"));
console.log(newWordsY);

// 8. Given an array of numbers, filter the numbers that are multiples of either 2 or 3 into a new array.

const numsOnetoTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newNumsOneToTen = numsOnetoTen.filter(
  (num) => num % 2 === 0 || num % 3 === 0
);
console.log(newNumsOneToTen);
// 9. Given an array of strings, filter the strings that includes the letter 'y' or 'a' into a new array.

const feelingWords = ["happy", "sad", "weepy", "sleepy", "rainy"];
const newFeelingWords = feelingWords.filter(
  (w) => w.includes("y") || w.includes("a")
);
console.log(newFeelingWords);
// 10.Given an array of numbers, filter the numbers between 20 to 40 into a new array.

const nums2 = [41, 12, 31, 14, 52, 6, 27, 38, 29, 100];
const newNums2 = nums2.filter((num) => num > 20 && num < 40);
console.log(newNums2);
