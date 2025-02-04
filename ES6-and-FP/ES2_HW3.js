// 1. Write an arrow function that takes a person's firstName and lastName and returns an object with properties for firstName and lastName.
const person = (firstName, lastName) => ({ firstName, lastName });
console.log(person("Jane", "Smith"));

// 2. Write an arrow function that takes a string and returns an object with properties for string length and its uppercase version.
// Expected Output: { length: 5, uppercase: 'HELLO' }
const strTrans = (str) => ({
  length: str.length,
  uppercase: str.toUpperCase(),
});
console.log(strTrans("hello")); // length: 5, uppercase: 'HELLO' }

// 3. Write an arrow function that takes a person's firstName, lastName, age and phoneNumber and returns an object with properties for fullName, age and phoneNumber.
const personInfo = (firstName, lastName, age, phoneNumber) => {
  const fullName = firstName + " " + lastName;
  return { fullName, age, phoneNumber };
};
console.log(personInfo("Jane", "Smith", 27, "+134678934")); // { fullName: "Jane Smith", age: 27, phoneNumber: "+134678934" }

// 4. Write an arrow function that takes two words and returns an object with properties for concatenation and character count.
// Expected Output: { concatenation: 'Hello World', charCount: 10 }
const wordsTrans = (w1, w2) => ({
  concatenation: w1 + " " + w2,
  charCount: (w1 + w2)?.length,
});
console.log(wordsTrans("Hello", "World")); // { concatenation: 'Hello World', charCount: 10 }

// 5. Write an arrow function that takes a radius and returns an object with properties for circumference and area of a circle. Use Math.PI method.
// // Expected output: { circumference: 31.4159, area: 78.5398 }
const calculateCircleProperties = (radius) => ({
  circumference: (2 * Math.PI * radius).toFixed(4),
  area: (Math.PI * (radius * radius)).toFixed(4),
});
console.log(calculateCircleProperties(5)); // { circumference: 31.4159, area: 78.5398 }

// 6. Write an arrow function that takes two numbers and returns an object with properties for their difference and quotient.
// // Expected output: { difference: 8, quotient: 5 }
const calculateDifferenceAndQuotient = (num1, num2) => ({
  difference: num1 - num2,
  quotient: num1 / num2,
});
console.log(calculateDifferenceAndQuotient(10, 2)); // { difference: 8, quotient: 5 }

// 7. Write an arrow function that takes a sentence and returns an object with property for word count in that sentence.
// // Expected output: { wordCount: 3 }
const analyzeSentence = (sentence) => ({
  wordCount: sentence.split(" ").length,
});
console.log(analyzeSentence("JavaScript is fun")); // { wordCount: 3 }

// 8. Write an arrow function that takes a number and returns an object with properties for its square and cube.
// // Expected output: { square: 16, cube: 64 }
const calculateSquareAndCube = (num) => ({
  square: num * num,
  cube: num * num * num,
});
console.log(calculateSquareAndCube(4)); // { square: 16, cube: 64 }

// 9. Write an arrow function that takes a number and returns an object indicating whether it's positive or negative.
const checkNumber = (num) => ({ isPositive: num > 0, isNegative: num < 0 });
console.log(checkNumber(-7)); // { isPositive: false, isNegative: true }
// // Expected output: { isPositive: false, isNegative: true }
console.log(checkNumber(5)); // { isPositive: true, isNegative: false }
// // Expected output: { isPositive: true, isNegative: false }
