// 1. Given an array of strings, use .map() to extract the first three characters of each string.

const words = ["apple", "banana", "kiwi", "orange", "grape"];
console.log(words.map((word) => word.slice(0, 3)));
// Output: ['app', 'ban', 'kiw', 'ora', 'gra']

// 2. Given an array of numbers, use `.map()` to calculate the cube of each number.

const nums = [1, 2, 3, 4, 5];
console.log(nums.map((num) => num * num * num));
// Output: [1, 8, 27, 64, 125]

// 3. Given an array of strings, use .map() to extract the characters of each string removing the first two characters.

const fruitsArray = ["apple", "banana", "kiwi", "orange", "grape"];
console.log(fruitsArray.map((fruit) => fruit.slice(2)));
// Output: [ 'ple', 'nana', 'wi', 'ange', 'ape' ]

// 4. Given an array of salaries, use .map() and return salaries with 10% bonus added.

const salaries = [5000, 7500, 12000, 3000, 9000];
console.log(salaries.map((s) => s + (s / 100) * 10));
// Output: [ 5500, 8250, 13200, 3300, 9900 ]

// 5. Given an array of names, use .map() to create an array of greetings by adding "Hello, " before each name.

const names = ["Alice", "Bob", "Charlie", "David", "Eva"];
console.log(names.map((name) => `Hello, ${name}`));
// Output: [ 'Hello, Alice', 'Hello, Bob', 'Hello, Charlie', 'Hello, David', 'Hello, Eva' ]

// 6. Given an array of sentences, use .map() to find the length of each sentence.

const sentences = [
  "Hello, how are you?",
  "JavaScript is fun!",
  "Arrays are versatile.",
];
console.log(sentences.map((s) => s.length));
// Output: [ 19, 18, 21 ]

// 7. Given an array of temperatures in Celsius, use map() to convert each temperature to Fahrenheit.

const temperaturesCelsius = [0, 20, 37, -5, 10];
console.log(temperaturesCelsius.map((t) => ((9 / 5) * t + 32).toFixed(1)));
// // Output: [ 32, 68, 98.6, 23, 50 ]

// 8. Given an array of prices, use .map() to apply and return 10% discounted price.

const prices = [50, 75, 120, 30, 90];
console.log(prices.map((p) => p - (p / 100) * 10));
// Output: [ 45, 67.5, 108, 27, 81 ]

// 9. Given an array of decimal numbers, use `.map()` to fix each number to two decimal points.

const decimalNumbers = [50.2456, 750.5677, 12.56705, 300.5065, 9.23406789];
console.log(decimalNumbers.map((n) => n.toFixed(2)));
// Output: [ '50.25', '750.57', '12.57', '300.51', '9.23' ]

// 10. Given an array of names, use .map() to create an array with length of each name added to the name.

const namesArray = ["Alice", "Bob", "Charlie", "David", "Eva"];
console.log(namesArray.map((name) => `${name}${name.length}`));
// Output:[ 'Alice5', 'Bob3', 'Charlie7', 'David5', 'Eva3' ]
