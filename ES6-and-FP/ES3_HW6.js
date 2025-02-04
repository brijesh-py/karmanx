// 1. Write an arrow function that takes an object containing temperature details and prints them.
const printTemperature = ({ location, temperature }) =>
  `Location: ${location}, Temperature: ${temperature} degree celsius`;
console.log(printTemperature({ location: "New York", temperature: 15 }));
// Output: Location: New York, Temperature: 15 degree celsius

console.log(printTemperature({ location: "London", temperature: 10 }));
// Output: Location: London, Temperature: 10 degree celsius

// 2. Write an arrow function that takes an object containing fruit details and prints them.
const printFruit = ({ fruitName, fruitColor, inStock }) =>
  `Fruit Name: ${fruitName}, Fruit Color: ${fruitColor}, Available: ${inStock}`;
console.log(
  printFruit({ fruitName: "Apple", fruitColor: "Red", inStock: true })
);
// Output: Fruit Name: Apple, Fruit Color: Red, Available: true

console.log(
  printFruit({ fruitName: "Grapes", fruitColor: "Green", inStock: false })
);
// Output: Fruit Name: Grapes, Fruit Color: Green, Available: false

// 3. Write an arrow function that takes an array containing a student's name and their scores, and prints them.
const printStudentScores = ([name, ...scores]) =>
  `Student: ${name}, Scores: ${scores.join(", ")}`;

console.log(printStudentScores(["Alice", 90, 85, 95]));
// Output: Student: Alice, Scores: 90, 85, 95

console.log(printStudentScores(["Bob", 80, 75, 85]));
// Output: Student: Bob, Scores: 80, 75, 85

// 4. Write an arrow function that takes an object containing details of a product and prints them by renaming the keys.
const printProductDetails = ({ name, price }) =>
  `Product: ${name}, Price: $${price}`;
console.log(printProductDetails({ name: "Laptop", price: 899 }));
// Output: Product: Laptop, Price: $899

console.log(printProductDetails({ name: "Phone", price: 599 }));
// Output: Product: Phone, Price: $599

// 5. Write an arrow function that takes an object containing a person's details with default parameters and prints them. Rename name and age.
const printPersonDetails = ({ name = "Anonymous", age = "Unknown" }) =>
  `Name: ${name}, Age: ${age}`;
console.log(printPersonDetails({ name: "John", age: 30 }));
// Output: Name: John, Age: 30

console.log(printPersonDetails({}));
// Output: Name: Anonymous, Age: Unknown

// 6. Write an arrow function that takes an array containing a city and its population details and prints them. Rename city,  population and country.
const printCityPopulation = ([city, { population, country }]) =>
  `City: ${city}, Population: ${population}, Country: ${country}`;
console.log(
  printCityPopulation(["New York", { population: 8623000, country: "USA" }])
);
// Output: City: New York, Population: 8623000, Country: USA

console.log(
  printCityPopulation(["Tokyo", { population: 37833000, country: "Japan" }])
);
// Output: City: Tokyo, Population: 37833000, Country: Japan

// 7. Write an arrow function that takes an array containing a car and its details and prints them. Rename car name and model.
const printCarDetails = ([name, { model, price }]) =>
  `Name: ${name}, Model: ${model}, Price: Rs. ${price}`;
console.log(
  printCarDetails(["All-Terrain SUV", { model: "SUV", price: 4500000 }])
);
// Output: Name: All-Terrain SUV, Model: SUV, Price: Rs. 4500000

console.log(
  printCarDetails(["GreenDrive Electric", { model: "Electric", price: 500000 }])
);
// Output: Name: GreenDrive Electric, Model: Electric, Price: Rs. 500000
