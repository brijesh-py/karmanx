// PS 1.6 - Update and Delete
// Exercise 1
let students = [
  { id: 1, name: "John", grade: "B" },
  { id: 2, name: "Emily", grade: "C" },
  { id: 3, name: "David", grade: "A" },
];
const updateStudents = students?.map((student) =>
  student?.id == 2 ? { ...student, grade: "A" } : student
);
// console.log(updateStudents);

// Exercise 2
let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Monitor", price: 300 },
  { id: 3, name: "Keyboard", price: 100 },
];
const deleteProduct = products?.filter((product) => product?.id != 3);
// console.log(deleteProduct)

// Exercise 3
let employees = [
  { id: 1, name: "John", department: "Engineering" },
  { id: 2, name: "Eve", department: "Sales" },
  { id: 3, name: "Mark", department: "Marketing" },
];
const updateEmployee = employees?.map((e) =>
  e?.id == 1 ? { ...e, department: "Human Resources" } : e
);
// console.log(updateEmployee);

// Exercise 4
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
];
const deleteBook = books?.filter((book) => book?.id !== 2);
// console.log(deleteBook);

// Exercise 5
let cars = [
  { id: 1, make: "Toyota", year: 2015 },
  { id: 2, make: "Honda", year: 2008 },
  { id: 3, make: "Tesla", year: 2020 },
];
const updateCar = cars?.map((car) =>
  car?.id == 3 ? { ...car, year: 2021 } : car
);
// console.log(updateCar);

// Exercise 6
let gadgets = [
  { id: 1, name: "iPhone", brand: "Apple" },
  { id: 2, name: "Pixel", brand: "Google" },
  { id: 3, name: "Galaxy", brand: "Samsung" },
];
const deleteGadget = gadgets?.filter((g) => g?.id !== 1);
// console.log(deleteGadget);

// Exercise 7
let projects = [
  { id: 1, name: "Project Alpha", duration: 12 },
  { id: 2, name: "Project Beta", duration: 10 },
  { id: 3, name: "Project Gamma", duration: 8 },
];
const updateProject = projects?.map((p) =>
  p?.id === 1 ? { ...p, duration: 14 } : p
);
// console.log(updateProject);

// Exercise 8
let restaurants = [
  { id: 1, name: "Pasta Palace", cuisine: "Italian" },
  { id: 2, name: "Dragon Wok", cuisine: "Chinese" },
  { id: 3, name: "Burger Barn", cuisine: "American" },
];
const deleteRestaurant = restaurants?.filter((r) => r?.id !== 2);
// console.log(deleteRestaurant);

// Exercise 9
let athletes = [
  { id: 1, name: "John", score: 85 },
  { id: 2, name: "Mike", score: 92 },
  { id: 3, name: "Sara", score: 88 },
];
const updateAthletes = athletes?.map((a) =>
  a?.id == 2 ? { ...a, score: 95 } : a
);
// console.log(updateAthletes);

// Exercise 10
let movies = [
  { id: 1, title: "Inception", rating: 8.8 },
  { id: 2, title: "Titanic", rating: 7.8 },
  { id: 3, title: "The Room", rating: 3.7 },
];
const deleteMovie = movies?.filter((m) => m?.id !== 3);
// console.log(deleteMovie);

// Exercise 11
let cities = [
  { id: 1, name: "Los Angeles", population: 4000000 },
  { id: 2, name: "New York", population: 8175133 },
  { id: 3, name: "Chicago", population: 2695598 },
];
const updateCity = cities?.map((c) =>
  c?.id === 3 ? { ...c, population: 8500000 } : c
);
// console.log(updateCity);

// Exercise 12
let courses = [
  { id: 1, title: "Mathematics", duration: "3 months" },
  { id: 2, title: "Physics", duration: "4 months" },
  { id: 3, title: "Chemistry", duration: "5 months" },
];
const deleteCourse = courses?.filter((c) => c?.id !== 1);
// console.log(deleteCourse);

// Exercise 13
let pets = [
  { id: 1, name: "Whiskers", type: "Cat" },
  { id: 2, name: "Rover", type: "Fish" },
  { id: 3, name: "Bella", type: "Dog" },
];
const updatePet = pets?.map((p) => (p?.id === 2 ? { ...p, type: "Dog" } : p));
// console.log(updatePet);

// Exercise 14
let computers = [
  { id: 1, brand: "Apple", model: "MacBook Pro" },
  { id: 2, brand: "Dell", model: "XPS 13" },
  { id: 3, brand: "HP", model: "Spectre x360" },
];

const deleteComputer = computers?.filter((c) => c?.id !== 3);
// console.log(deleteComputer);

// Exercise 15
let appliances = [
  { id: 1, name: "Microwave", wattage: 1000 },
  { id: 2, name: "Toaster", wattage: 800 },
  { id: 3, name: "Blender", wattage: 500 },
];
const updateWattage = appliances?.map((a) =>
  a?.id === 1 ? { ...a, wattage: 1200 } : a
);
// console.log(updateWattage);
