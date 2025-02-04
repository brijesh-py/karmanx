// 1. Given an array of strings, find the total length of all strings using `.reduce()`.

const stationeryWords = [
  "pen",
  "notebook",
  "eraser",
  "notebook",
  "pencil",
  "notebook",
  "pencil",
];
console.log(stationeryWords.reduce((acc, ele) => (acc = acc + ele.length), 0));
// Output: 45

// 2. Given an array of numbers, find the sum of all even number using `.reduce()`.

const numbersArray = [1, 2, 3, 4, 5, 6];
console.log(
  numbersArray.reduce((acc, ele) => (ele % 2 == 0 ? (acc = acc + ele) : acc), 0)
);
// Output: 12

// 3. Given an array of numbers, count the number of odd numbers using `.reduce()`.

const numsArr = [11, 22, 32, 14, 15, 62, 17, 18, 29, 10];
console.log(
  numsArr.reduce((acc, ele) => (ele % 2 !== 0 ? (acc = acc + 1) : acc), 0)
);
// Output: 4

// 4. Given an array of numbers, create an object with the count of even and odd numbers using `.reduce()`.

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(
  nums.reduce(
    (acc, ele) => {
      ele % 2 === 0 ? (acc.even = acc.even + 1) : (acc.odd = acc.odd + 1);
      return acc;
    },
    { even: 0, odd: 0 }
  )
);
// Output: { even: 4, odd: 5 }

// 5. Given an array of numbers, create an object with the count of positive and negative numbers using `.reduce()`.

const allNumns = [1, 2, -3, 4, 5, -6, 7, -8, -9, 12];
console.log(
  allNumns.reduce(
    (acc, ele) => {
      ele > 0 ? (acc.pos = acc.pos + 1) : (acc.neg = acc.neg + 1);
      return acc;
    },
    { pos: 0, neg: 0 }
  )
);
// Output: { pos: 6, neg: 4 }

// 6. Given an array of numbers, find the product of negative numbers using `.reduce()`.

const numPositive = [-2, 3, 4, 0, -5, 6];
console.log(
  numPositive.reduce((acc, ele) => (ele < 0 ? (acc = acc * ele) : acc), 1)
);
// Output: 10

// 7. Given an array of strings, capitalize all the letter of each word and concatenate them into a single string using `.reduce()`.

const wordsCaps = ["reduce", "method", "needs", "a", "lot", "of", "practice"];
console.log(
  wordsCaps.reduce((acc, ele) => (acc = acc + " " + ele.toUpperCase()), "")
);
// Output: REDUCE METHOD NEEDS A LOT OF PRACTICE

// 8. Given an array of numbers, create an object with the count of positive even numbers and count of all the other numbers using `.reduce()`.

const allNumsArr = [1, 2, -3, 4, 5, -6, 7, -8, -9, 12];
console.log(
  allNumsArr.reduce(
    (acc, ele) => {
      ele > 0 && ele % 2 === 0
        ? (acc.posEven = acc.posEven + 1)
        : (acc.others = acc.others + 1);
      return acc;
    },
    {
      posEven: 0,
      others: 0,
    }
  )
);
// Output: { posEven: 3, others: 7 }

// 9. Given an array of numbers, find the sum of all negative odd number using `.reduce()`.

const numbersArr = [1, -2, -3, 4, -5, 6, 7, -9, 12, 11];
console.log(
  numbersArr.reduce((acc, ele) => {
    ele < 0 ? (acc = acc + ele) : acc;
    return acc;
  }, 0)
);
// Output: -19
// Output: -17

// 10. Given an array of strings, concatenate all letters into a single word using `.reduce()`.

const letters = ["a", "l", "p", "h", "a", "b", "e", "t"];
console.log(letters.reduce((acc, ele) => (acc = acc + ele)));
// Output: alphabet
