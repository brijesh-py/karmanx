// PS 1.5 - Push and For Loop
// Exercise 1
let numbers = [2, 4, 6, 10, 5];
let numbersDoubledValue = numbers?.map((number) => number + number);
// console.log(numbersDoubledValue);

// Exercise 2
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "David", grade: "C" },
];
const studentsNames = [];
for (let key in students) {
  const student = students[key];
  if (student?.grade == "A") {
    studentsNames.push(student?.name);
  }
}
// console.log(studentsNames);

// Exercise 3
const prices = [99, 150, 75, 120, 200];
const highPrices = [];
for (let key in prices) {
  const price = prices[key];
  if (price > 100) {
    highPrices.push(price);
  }
}
// console.log(highPrices);

// Exercise 4
const ages = [12, 15, 22, 29, 34];
const evenAges = [];
for (let key in ages) {
  const age = ages[key];
  if (age % 2 === 0) {
    evenAges.push(age);
  }
}
// console.log(evenAges);

// Exercise 5
const sports = ["Soccer", "Basketball", "Tennis"];
const combineString = sports?.map((sport) => sport + "?");
// console.log(combineString);

// Exercise 6
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];
for (let key in numbers2) {
  const num = numbers2[key];
  if (num % 2 === 0) {
    evenNumbers.push(num);
  }
}
// console.log(evenNumbers);

// Exercise 7
const numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const OddNumbers = [];
for (let key in numbers3) {
  const num = numbers3[key];
  if (num % 2 != 0) {
    OddNumbers.push(num);
  }
}
// console.log(OddNumbers);

// Exercise 8
const names = ["John", "Doe", "Jane", "Smith"];
const concatenatesString = names?.join("-");
// console.log(concatenatesString);

// Exercise 9
const strings = ["Hello", "world", "from", "practice", "set"];
const concatenatesString2 = strings?.join(" ");
// console.log(concatenatesString2);

// Exercise 10
const strings2 = ["apple", "banana", "cherry"];
const separateString = strings2?.join(",");
// console.log(separateString);

// Exercise 11
const cars = [
  { make: "Toyota", model: "Camry", year: 2015 },
  { make: "Honda", model: "Accord", year: 2008 },
  { make: "Tesla", model: "Model 3", year: 2020 },
  { make: "Ford", model: "Fusion", year: 2009 },
];
const filteredCarByYear = cars?.filter((car) => car?.year > 2010);
// console.log(filteredCarByYear);

// Exercise 12
const temperatures = [0, 20, 37, 100];
function numberToFahrenheit(value) {
  return (value * 9) / 5 + 32;
}
const temperaturesInFahrenheit = temperatures?.map((temp) =>
  numberToFahrenheit(temp)
);
// console.log(temperaturesInFahrenheit);

// Exercise 13
const scores = [10, 22, 25, 33, 40, 55];
const filteredScore = scores?.filter((score) => score % 5 == 0);
// console.log(filteredScore);

// Exercise 14
const events = [
  { title: "Concert", date: "2022-08-10", location: "New York" },
  { title: "Art Exhibition", date: "2022-09-12", location: "Los Angeles" },
  { title: "Tech Conference", date: "2022-10-05", location: "New York" },
];
const eventsPlace = [];
for (let key in events) {
  const event = events[key];
  if (event?.location == "New York") {
    eventsPlace.push(event?.title);
  }
}
// console.log(eventsPlace);

// Exercise 15
const ages2 = [20, 25, 30, 35];
const updatedAges = ages2?.map((age) => age + 10);
console.log(updatedAges);
