// 1. Given an array of objects representing students, filter out the students with a grade lower than 70%.

const students = [
  { name: "Alice", grade: 80 },
  { name: "Bob", grade: 65 },
  { name: "Charlie", grade: 90 },
];
console.log(students.filter((s) => s.grade > 70));
// Output: [ { name: 'Alice', grade: 80 }, { name: 'Charlie', grade: 90 } ]

// 2. Given an array of objects representing products, filter out the products with a price higher than $1000.

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Smartphone", price: 800 },
  { name: "Tablet", price: 500 },
];
console.log(products.filter((p) => p.price < 1000));
// // Output: [ { name: 'Smartphone', price: 800 }, { name: 'Tablet', price: 500 } ]

// 3. Given an array of objects representing employees, filter out the employees with a salary lower than $50,000.

const employees = [
  { name: "Alice", salary: 60000 },
  { name: "Bob", salary: 45000 },
  { name: "Charlie", salary: 70000 },
];
console.log(employees.filter((e) => e.salary > 50000));

// // Output: [{ name: 'Alice', salary: 60000 }, { name: 'Charlie', salary: 70000 }]

// 4. Given an array of objects representing movies, filter out movies with a rating lower than 7.0.

const movies = [
  { title: "Inception", rating: 8.8 },
  { title: "Interstellar", rating: 8.6 },
  { title: "The Dark Knight", rating: 9.0 },
];
console.log(movies.filter((m) => m.rating > 7));
// // Output: [{ title: 'Inception', rating: 8.8 }, { title: 'Interstellar', rating: 8.6 }, { title: 'The Dark Knight', rating: 9 }]

// 5. Given an array of objects representing cars, filter out the cars older than 5 years.

const cars = [
  { brand: "Toyota", year: 2018 },
  { brand: "Honda", year: 2019 },
  { brand: "Ford", year: 2010 },
];

const currentYear = new Date().getFullYear();
console.log(cars.filter((car) => currentYear - car.year <= 5));
// // Output: [ { brand: 'Honda', year: 2019 } ]

// 6. Given an array of objects representing students, filter out the  students with a GPA lower than 3.5.

const students2 = [
  { name: "Alice", gpa: 3.8 },
  { name: "Bob", gpa: 3.2 },
  { name: "Charlie", gpa: 3.9 },
];
console.log(students2.filter((s) => s.gpa > 3.5));
// // Output: [ { name: 'Alice', gpa: 3.8 }, { name: 'Charlie', gpa: 3.9 } ]

// 7. Given an array of objects representing fruits, filter out the fruits with a price higher than $2.00 per pound.

const fruits = [
  { name: "Apple", pricePerPound: 1.5 },
  { name: "Banana", pricePerPound: 2.2 },
  { name: "Orange", pricePerPound: 1.8 },
];
console.log(fruits.filter((f) => f.pricePerPound < 2));
// // Output: [{ name: 'Apple', pricePerPound: 1.5 }, { name: 'Orange', pricePerPound: 1.8 }]

// 8. Given an array of objects representing employees, filter out the employees who are not currently employed.

const employees2 = [
  { name: "Alice", employed: true },
  { name: "Bob", employed: false },
  { name: "Charlie", employed: true },
];
console.log(employees2.filter((e) => e.employed));
// // Output: [{ name: 'Alice', employed: true }, { name: 'Charlie', employed: true }]

// 9. Given an array of objects representing products, filter out the products that are not in stock.

const products2 = [
  { name: "Laptop", inStock: true },
  { name: "Smartphone", inStock: false },
  { name: "Tablet", inStock: true },
];
console.log(products2.filter((p) => p.inStock));
// // Output: [{ name: 'Laptop', inStock: true }, { name: 'Tablet', inStock: true }]

// 10. Given an array of objects representing laptops, filter out the laptops with a screen size less than 15 inches.

const laptops = [
  { brand: "Dell", screenSize: 14 },
  { brand: "HP", screenSize: 15.6 },
  { brand: "Lenovo", screenSize: 13 },
  { brand: "Acer", screenSize: 17 },
];
console.log(laptops.filter((l) => l.screenSize > 15));
// // Output: [{ brand: 'HP', screenSize: 15.6 }, { brand: 'Acer', screenSize: 17 }]
