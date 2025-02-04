// 1. Given an array of objects representing smartphones, filter out the phones released before 2020 and with a camera resolution less than 12 megapixels.

const smartphones = [
  { brand: "iPhone", year: 2019, cameraResolution: 12.2 },
  { brand: "Samsung", year: 2021, cameraResolution: 13 },
  { brand: "Google Pixel", year: 2018, cameraResolution: 11 },
];
console.log(
  smartphones.filter((s) => s.year > 2020 && s.cameraResolution > 12)
);
// // Output: [ { brand: 'Samsung', year: 2021, cameraResolution: 13 } ]

// 2. Given an array of objects representing books, filter out the books published before 2005 and with more than 400 pages.

const books = [
  { title: "The Da Vinci Code", year: 2003, pages: 454 },
  { title: "The Alchemist", year: 1988, pages: 197 },
  { title: "The Hunger Games", year: 2008, pages: 374 },
];
console.log(books.filter((b) => b.year > 2005 && b.pages < 400));
// // Output: [ { title: 'The Hunger Games', year: 2008, pages: 374 } ]

// 3. Given an array of objects representing students, filter out the students with an age less than 18 and a GPA lower than 3.5.

const students = [
  { name: "Alice", age: 20, gpa: 3.8 },
  { name: "Bob", age: 17, gpa: 3.2 },
  { name: "Charlie", age: 19, gpa: 3.9 },
];
console.log(students.filter((s) => s.age > 18 && s.gpa > 3.5));
// // Output:

// [
//   { name: 'Alice', age: 20, gpa: 3.8 },
//   { name: 'Charlie', age: 19, gpa: 3.9 }
// ]

// 4. Given an array of objects representing employees, filter out the employees with a salary less than $50,000 and hired before 2010.

const employees = [
  { name: "Emily", salary: 55000, hireYear: 2008 },
  { name: "David", salary: 48000, hireYear: 2012 },
  { name: "Grace", salary: 60000, hireYear: 2006 },
];
console.log(employees.filter((e) => e.salary < 50000 && e.hireYear < 2010));
// // Output:

// []

// 5. Given an array of objects representing products, filter out the products with a price less than $100 and not in stock.

const products = [
  { name: "Laptop", price: 1200, inStock: true },
  { name: "Headphones", price: 50, inStock: false },
  { name: "Smartphone", price: 800, inStock: true },
];
console.log(products.filter((p) => p.price > 100 && p.inStock));
// // Output:
// [
//   { name: 'Laptop', price: 1200, inStock: true },
//   { name: 'Smartphone', price: 800, inStock: true }
// ]
// 6. Given an array of objects representing movies, filter out the movies released before 2010, with a rating less than 8.0, and not in the "Action" genre.

const movies = [
  { title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
  { title: "Avatar", year: 2009, rating: 7.8, genre: "Adventure" },
  { title: "The Dune", year: 2018, rating: 6.0, genre: "Action" },
];
console.log(
  movies.filter((m) => m.year > 2010 && m.rating > 8 && m.genre == "Action")
);
// // Output:

// []

// 7. Given an array of objects representing apartments, filter out the apartments with a price less than $1500, not in a safe neighborhood, and with less than 2 bedrooms.

const apartments = [
  { location: "Downtown", price: 1600, bedrooms: 2, safeNeighborhood: true },
  { location: "Suburb", price: 1400, bedrooms: 1, safeNeighborhood: false },
  {
    location: "City Center",
    price: 1800,
    bedrooms: 3,
    safeNeighborhood: true,
  },
];
console.log(
  apartments.filter(
    (a) => a.price >= 1500 && a.safeNeighborhood && a.bedrooms >= 2
  )
);

// // Output:
// [
//   {
//     location: 'Downtown',
//     price: 1600,
//     bedrooms: 2,
//     safeNeighbourhood: true
//   },
//   {
//     location: 'City Center',
//     price: 1800,
//     bedrooms: 3,
//     safeNeighbourhood: true
//   }
// ]

// 8. Given an array of objects representing products, filter out the products with a price less than $50, not available online, and not in the "Electronics" category.

const products2 = [
  {
    name: "Laptop",
    price: 800,
    onlineAvailability: true,
    category: "Electronics",
  },
  {
    name: "Book",
    price: 20,
    onlineAvailability: false,
    category: "Literature",
  },
  { name: "Book", price: 40, onlineAvailability: false, category: "Classic" },
  {
    name: "Headphones",
    price: 60,
    onlineAvailability: true,
    category: "Electronics",
  },
];
console.log(
  products2.filter(
    (p) =>
      p.price >= 50 && p.onlineAvailability && p.Electronics == "Electronics"
  )
);
// 9. Given an array of objects representing job applicants, filter out the applicants with less than 3 years of experience, not proficient in English, and without a relevant degree.

const jobApplicants = [
  {
    name: "Alice",
    experienceYears: 4,
    englishProficiency: true,
    relevantDegree: true,
  },
  {
    name: "Bob",
    experienceYears: 2,
    englishProficiency: false,
    relevantDegree: true,
  },
  {
    name: "Charlie",
    experienceYears: 5,
    englishProficiency: true,
    relevantDegree: false,
  },
];
console.log(
  jobApplicants.filter(
    (j) => j.experienceYears >= 3 && j.englishProficiency && j.relevantDegree
  )
);

// 10. Given an array of objects representing restaurants, filter out the restaurants with less than 4 stars, not serving vegetarian options, and located outside the city.

const restaurants = [
  {
    name: "Gourmet Grill",
    stars: 4.5,
    vegetarianOptions: true,
    location: "City",
  },
  {
    name: "Fast Noodles",
    stars: 3.8,
    vegetarianOptions: false,
    location: "Suburb",
  },
  {
    name: "Healthy Bites",
    stars: 4.2,
    vegetarianOptions: true,
    location: "City",
  },
  {
    name: "Chat Street",
    stars: 3.5,
    vegetarianOptions: false,
    location: "Suburb",
  },
];
console.log(
  restaurants.filter(
    (r) => r.stars >= 4 && r.vegetarianOptions && r.location == "City"
  )
);
// 11. Given an array of objects representing books, filter out the books published before 2000, with a rating less than 7.5, and not in the "Mystery" or "Thriller" genre.

const books2 = [
  { title: "The Da Vinci Code", year: 2003, rating: 8.6, genre: "Mystery" },
  { title: "To Kill a Mockingbird", year: 1960, rating: 8.3, genre: "Drama" },
  { title: "Gone Girl", year: 2012, rating: 9.0, genre: "Thriller" },
];
console.log(
  books2.filter(
    (b) =>
      b.year >= 2000 &&
      b.rating >= 7.5 &&
      (b.genre == "Mystery" || b.genre == "Thriller")
  )
);
// // Expected Output:

// [

//   { title: 'The Da Vinci Code', year: 2003, rating: 8.6, genre: 'Mystery' },

//   { title: 'Gone Girl', year: 2012, rating: 9, genre: 'Thriller' }

// ]

// 12. Given an array of objects representing employees, filter out the employees with less than 5 years of experience, not proficient in English, and not working in the "Engineering" or "Marketing" department.

const employees2 = [
  {
    name: "David",
    experienceYears: 6,
    englishProficiency: true,
    department: "Engineering",
  },
  {
    name: "Emma",
    experienceYears: 4,
    englishProficiency: false,
    department: "Finance",
  },
  {
    name: "Alex",
    experienceYears: 7,
    englishProficiency: true,
    department: "Marketing",
  },
];
console.log(
  employees2.filter(
    (e) =>
      e.experienceYears >= 5 &&
      e.englishProficiency &&
      (e.department == "Engineering" || e.department == "Marketing")
  )
);
// // Expected Output:
// [
//   {
//     name: 'David',
//     experienceYears: 6,
//     englishProficiency: true,
//     department: 'Engineering'
//   },
//   {
//     name: 'Alex',
//     experienceYears: 7,
//     englishProficiency: true,
//     department: 'Marketing'
//   }
// ]
