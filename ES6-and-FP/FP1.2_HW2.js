// 1. Given an array of objects representing students with exam scores, add a new property indicating whether they passed or failed using `.map()`. 60 and above is the passing score.

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 55 },
  { name: "Charlie", score: 75 },
];
console.log(students.map((s) => ({ ...s, passed: s.passed >= 60 })));

// // output:
// [
//   { name: 'Alice', score: 85, passed: true },
//   { name: 'Bob', score: 55, passed: false },
//   { name: 'Charlie', score: 75, passed: true }
// ]

// 2. Given an array of objects representing songs with durations (in seconds), convert durations to minutes using .map().

const songs = [
  { title: "Bohemian Rhapsody", duration: 367 },
  { title: "Hotel California", duration: 420 },
  { title: "Stairway to Heaven", duration: 482 },
];
console.log(
  songs.map((s) => ({
    ...s,
    duration: parseInt(s.duration / 60) + ":" + parseInt(s.duration % 60),
  }))
);
// Output:
// [
//   { title: 'Bohemian Rhapsody', duration: '6:7' },
//   { title: 'Hotel California', duration: '7:0' },
//   { title: 'Stairway to Heaven', duration: '8:2' }
// ]

// 3. Given an array of objects representing employees with monthly salaries, extract the salaries and calculate the annual income using .map().

const employees = [
  { name: "Alice", salary: 50000 },
  { name: "Bob", salary: 60000 },
  { name: "Charlie", salary: 70000 },
];
console.log(employees.map((e) => ({ ...e, annualIncome: e.salary * 12 })));
// // Output:

// [

//   { name: 'Alice', salary: 50000, annualIncome: 600000 },

//   { name: 'Bob', salary: 60000, annualIncome: 720000 },

//   { name: 'Charlie', salary: 70000, annualIncome: 840000 }

// ]

// 4. Given an array of objects representing students with ages, extract the ages and classify them as "adult" or "minor" using .map(). 18 and above is an adult.

const newStudents = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 25 },
];
console.log(
  newStudents.map((s) => ({
    ...s,
    classification: s.age >= 18 ? "adult" : "minor",
  }))
);
// // Output:

// [

//   { name: 'Alice', age: 22, classification: 'adult' },

//   { name: 'Bob', age: 17, classification: 'minor' },

//   { name: 'Charlie', age: 25, classification: 'adult' }

// ]

// 5. Given an array of objects representing employees with salaries, use .map() to add $ sign to the salaries.

const employees2 = [
  { name: "Emily", salary: 60000 },
  { name: "David", salary: 45000 },
  { name: "Grace", salary: 75000 },
];
console.log(employees2.map((e) => ({ ...e, salary: "$" + e.salary })));
// Output:
//  [ { name: 'Emily', salary: '$60000' },
//  { name: 'David', salary: '$45000' },
// { name: 'Grace', salary: '$75000' } ]

// 6. Given an array of objects representing products with prices, use .map() to label them as "expensive" or "affordable." Consider products with prices of $100 and above as "expensive."

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Headphones", price: 50 },
  { name: "Smartphone", price: 800 },
];
console.log(
  products.map((p) => ({
    name: p.name,
    label: p.price >= 100 ? "expensive" : "affordable",
  }))
);
// Output:

// [ { name: 'Laptop', label: 'expensive' },

// { name: 'Headphones', label: 'affordable' },

// { name: 'Smartphone', label: 'expensive' } ]

// 7. Given an array of objects representing books with publication years, use .map() to categorise them as "modern" or "classic." Assume books published in or after the year 2000 are considered "modern."

const books = [
  { title: "The Catcher in the Rye", year: 1951 },
  { title: "Harry Potter and the Sorcerer's Stone", year: 1997 },
  { title: "The Hunger Games", year: 2008 },
];
console.log(
  books.map((b) => ({
    title: b.title,
    category: b.year >= 2000 ? "modern" : "classic",
  }))
);

// // Output:

// [ { title: 'The Catcher in the Rye', category: 'classic' },

// { title: "Harry Potter and the Sorcerer's Stone", category: 'classic' },

// { title: 'The Hunger Games', category: 'modern' } ]

// 8. Given an array of objects representing software developers with hourly rates and hours worked per week, use .map() to calculate their annual income. Assume 50 weeks per year.

const developers = [
  { name: "John", hourlyRate: 40, hoursPerWeek: 30 },
  { name: "Lisa", hourlyRate: 50, hoursPerWeek: 35 },
  { name: "Mike", hourlyRate: 45, hoursPerWeek: 40 },
];
console.log(
  developers.map((d) => ({
    name: d.name,
    annualIncome: d.hourlyRate * d.hoursPerWeek * 50,
  }))
);
// // Output:

// [ { name: 'John', annualIncome: 60000 },

// { name: 'Lisa', annualIncome: 87500 },

// { name: 'Mike', annualIncome: 90000 } ]

// 9. Given an array of objects representing sales representatives with monthly commissions, use .map() to calculate their annual income assuming a fixed base salary of $50000.

const salesReps = [
  { name: "David", monthlyCommission: 8000 },
  { name: "Helen", monthlyCommission: 10000 },
  { name: "Ivan", monthlyCommission: 6000 },
];
console.log(
  salesReps.map((s) => ({
    name: s.name,
    annualIncome: s.monthlyCommission * 12 + 50000,
  }))
);
// // Output:

// [

//   { name: 'David', annualIncome: 146000 },

//   { name: 'Helen', annualIncome: 170000 },

//   { name: 'Ivan', annualIncome: 122000 }

// ]

// 10. Given an array of objects representing students with scores, use .map() to convert scores to grades based on the grading system (A, B, C, D, F).

const students2 = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 60 },
  { name: "Charlie", score: 92 },
];
console.log(
  students2.map((s) => {
    const grade =
      (s.score > 89 && "A") ||
      (s.score > 79 && "B") ||
      (s.score > 69 && "C") ||
      (s.score > 59 && "D") ||
      "F";
    return { name: s.name, grade };
  })
);
// score 90 and above will get "A" grade.

// score 80 and above will get  "B" grade.

// score 70 and above will get "C" grade.

// score 60 and above will get "D" grade.

// score 59 and below will get F grade.

// // Output:

// [ { name: 'Alice', grade: 'B' },

// { name: 'Bob', grade: 'D' },

// { name: 'Charlie', grade: 'A' } ]
