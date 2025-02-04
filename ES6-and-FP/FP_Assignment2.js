// 1. Write a function that takes an array of objects representing books with title, author, and genre. The function should return a new array containing only the books from the "Fantasy" genre.

const books = [
  {
    title: "Harry Potter and the Sorcerer's Stone'",
    author: "J.K. Rowling",
    genre: "Fantasy",
  },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Drama" },
  { title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
];
const filterBooks = (obj, genre = "Fantasy") => {
  return obj.filter((ele) => ele.genre == genre);
};
console.log(filterBooks(books));

// Output: [ { title: 'Harry Potter and the Sorcerer's Stone', author: 'J.K. Rowling', genre: 'Fantasy' }, { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' } ]

// 2. Given an array of objects representing movies, filter out the movies released before 2010, with a rating less than 8.0, and not in the "Action" or "Adventure" genre.

const movies = [
  { title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
  { title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi" },
  { title: "Tripple Frontier", year: 2023, rating: 9.0, genre: "Action" },
  { title: "Jurassic Park", year: 1993, rating: 8.1, genre: "Adventure" },
];
console.log(
  movies.filter(
    (ele) =>
      ele.year > 2010 &&
      ele.rating > 8 &&
      (ele.genre == "Action" || ele.genre == "Adventure")
  )
);
// // Output: [{ title: 'Tripple Frontier', year: 2023, rating: 9, genre: 'Action' }]

// 3. Given an array of objects representing restaurants, filter out the restaurants with less than 4 stars, not serving Italian cuisine, and not open on Sundays.

const restaurants = [
  {
    name: "Pasta Paradise",
    stars: 4.5,
    cuisine: "Italian",
    openOnSundays: false,
  },
  {
    name: "Sushi Sensation",
    stars: 3.8,
    cuisine: "Japanese",
    openOnSundays: true,
  },
  {
    name: "Burger Binge",
    stars: 4.2,
    cuisine: "American",
    openOnSundays: true,
  },
  { name: "Nasi", stars: 4.5, cuisine: "Italian", openOnSundays: true },
];
console.log(
  restaurants.filter(
    (ele) => ele.stars > 4 && ele.cuisine == "Italian" && ele.openOnSundays
  )
);

// // Output: [{ name: 'Nasi', stars: 4.5, cuisine: 'Italian', openOnSundays: true }]

// 4. Write a function that takes an array of objects with name, price and quantity, and returns a new array with only the names containing bread.

const products = [
  { name: "Bread", price: 480, quantity: 3 },
  { name: "Clips", price: 200, quantity: 5 },
  { name: "green Bread Knife", price: 3077, quantity: 1 },
  { name: "Slipper", price: 150, quantity: 2 },
];
const transProduct = (arr) => {
  return arr.reduce((acc, ele) => {
    ele.name.includes("Bread") ? acc.push(ele.name) : acc;
    return acc;
  }, []);
};
console.log(transProduct(products));
// // Output: ["Bread", "green Bread Knife"]

// 5. For each employee in the given array of objects representing employees with salaries,
//  calculate and add a new property indicating whether their salary is above or below the average salary of all employees using .map(). Use .reduce() to calculate the average salary.

const employees = [
  { name: "David", salary: 60000 },
  { name: "Emma", salary: 75000 },
  { name: "Alex", salary: 90000 },
  { name: "Sophie", salary: 55000 },
];
const totalSalary = employees.reduce((acc, ele) => acc + ele.salary, 0);
const averageSalary = totalSalary / employees.length;
console.log(
  employees.map((ele) => ({ ...ele, aboveAverage: ele.salary > averageSalary }))
);
// // Output: [ { name: 'David', salary: 60000, aboveAverage: false }, { name: 'Emma', salary: 75000, aboveAverage: true }, { name: 'Alex', salary: 90000, aboveAverage: true }, { name: 'Sophie', salary: 55000, aboveAverage: false } ]

// 6. Write a function that takes an array  of objects with name, role, and array of hours which represents the time the person spends on the server each day.
// Find the person who is the most active in the community and spends most of the time in it using reduce() method.

const community = [
  { name: "Raju", role: "student", hours: [1, 2, 3, 1, 2, 3, 0] },
  { name: "Aakash", role: "mentor", hours: [1, 2, 3, 1, 2, 3, 0] },
  { name: "Ramesh", role: "student", hours: [1, 2, 3, 1, 2, 3, 3] },
  { name: "Jiten", role: "TA", hours: [2, 2, 3, 5, 2, 3, 0] },
  { name: "Harsh", role: "student", hours: [1, 7, 3, 2, 2, 3, 0] },
  { name: "Akshay", role: "student", hours: [1, 6, 3, 1, 2, 3, 0] },
  { name: "Rohan", role: "mentor", hours: [1, 2, 3, 12, 2, 3, 0] },
  { name: "Mohan", role: "student", hours: [1, 8, 3, 0, 2, 3, 0] },
];

const getActiveUser = (arr) => {
  return arr.reduce((acc, ele) => {
    const hoursAcc = acc.hours
      ? acc.hours.reduce((acc2, ele2) => acc2 + ele2)
      : 0;
    const hoursEle = ele.hours.reduce((acc, ele) => acc + ele, 0);
    hoursAcc < hoursEle ? (acc = ele) : acc;
    return acc;
  }, {});
};
console.log(getActiveUser(community));
// // Output: { name: "Rohan", role: "mentor", hours: [1, 2, 3, 12, 2, 3, 0] }

// 7. Write a function that takes an array of objects with name, role and array of hours which represents the time a person spends on the server each day. Give the tag of regular to students who are active in the community and spends more than 20 hours a week.

const communityData = [
  { name: "Raju", role: "student", hours: [1, 2, 3, 1, 2, 3, 0] },
  { name: "Aakash", role: "mentor", hours: [1, 2, 3, 4, 5, 6, 7] },
  { name: "Ramesh", role: "student", hours: [4, 5, 6, 4, 5, 6, 0] },
  { name: "Jiten", role: "TA", hours: [2, 2, 3, 5, 2, 3, 0] },
  { name: "Harsh", role: "student", hours: [7, 8, 9, 7, 8, 9, 0] },
  { name: "Akshay", role: "student", hours: [1, 3, 5, 7, 9, 0, 2] },
  { name: "Rohan", role: "mentor", hours: [1, 2, 3, 12, 2, 3, 0] },
  { name: "Mohan", role: "student", hours: [4, 6, 8, 0, 1, 9, 2] },
];
const getRegularStudent = (arr) => {
  return arr.reduce((acc, ele) => {
    const hours = ele.hours.reduce((acc, ele) => acc + ele, 0);
    hours >= 20 ? (ele.tag = "regular") : ele;
    acc.push(ele);
    return acc;
  }, []);
};
console.log(getRegularStudent(communityData));
// // Output: [

// //   { name: "Raju", role: "student", hours: [1, 2, 3, 1, 2, 3, 0] },

// //   { name: "Aakash", role: "mentor", hours: [1, 2, 3, 4, 5, 6, 7] },

// //   { name: "Ramesh", role: "student", hours: [4, 5, 6, 4, 5, 6, 0], tag: "regular" },

// //   { name: "Jiten", role: "TA", hours: [2, 2, 3, 5, 2, 3, 0] },

// //   { name: "Harsh", role: "student", hours: [7, 8, 9, 7, 8, 9, 0] tag: "regular" },

// //   { name: "Akshay", role: "student", hours: [1, 3, 5, 7, 9, 0, 2] tag: "regular" },

// //   { name: "Rohan", role: "mentor", hours: [1, 2, 3, 12, 2, 3, 0] },

// //   { name: "Mohan", role: "student", hours: [4, 6, 8, 0, 1, 9, 2] tag: "regular" }

// // ]
