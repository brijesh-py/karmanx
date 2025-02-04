// 1. Given an array of numbers, filter the numbers more than 10 into a new array.

const nums = [12, 5, 20, 8, 15, 30];
const arrNums = nums.filter((num) => num > 10);
console.log(arrNums);

// 2. Given an array of strings, filter the strings that contain the letter 'o' into a new array.

const words = ["hello", "world", "apple", "orange", "banana"];
const arrWords = words.filter((w) => w.includes("o"));
console.log(arrWords);
// 3. Given an array of numbers, filter the prime numbers into a new array.

const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrNumbers = numbers.filter((num) => num % 2 === 0);
console.log(arrNumbers);
// 4. Given an array of numbers, filter the numbers that are not multiples of 3 into a new array.

const threeMultiples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrThreeMultiples = threeMultiples.filter((num) => num % 3 !== 0);
console.log(arrThreeMultiples);
// 5. Given an array of numbers, filter the numbers not divisible by both 2 and 3 into a new array.

const nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrNums2 = nums2.filter((num) => num % 2 !== 0 && num % 3 !== 0);
console.log(arrNums2);
// 6. Given an array of strings, filter the strings that are in uppercase into a new array.

const words2 = ["APPLE", "banana", "KIWI", "ORANGE", "GRAPE"];
const arrWords2 = words2.filter((w) => w == w.toUpperCase());
console.log(arrWords2);
// 7. Given an array of strings, filter the strings that do not end with the letter 'y'.

const wordsY = ["happy", "sad", "sunny", "cloudy", "rainy"];
const arrWordsY = wordsY.filter((w) => !w.endsWith("y"));
console.log(arrWordsY);
// 8. Given an array of numbers, filter the numbers that are multiples of both 2 and 3 into a new array.

const nums3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrNums3 = nums3.filter((num) => num % 2 === 0 && num % 3 === 0);
console.log(arrNums3);
// 9. Given an array of strings, filter the strings that includes the letter 'y' and 'u' into a new array.

const feelingWords = ["happy", "sad", "sunny", "cloudy", "rainy"];
const arrFeelingWords = feelingWords.filter(
  (w) => w.includes("y") && w.includes("u")
);
console.log(arrFeelingWords);
// 10.Given an array of numbers, filter the numbers that are multiples of 5 or 3 into a new array.

const newNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrNewNums = newNums.filter((num) => num % 3 === 0 || num % 5 == 0);
console.log(arrNewNums);
