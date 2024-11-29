// PS 1.4 - Sorting
// Exercise 1
let numbers = [2, 5, 10, 6, 4];
const sortedNumbersAscend = numbers?.sort((num1, num2) => num1 - num2);
// console.log(sortedNumbersAscend);

// Exercise 2
const ages = [32, 21, 45, 29, 39];
const sortedAgeAscend = ages?.sort((age1, age2) => age2 - age1);
// console.log(sortedAgeAscend);

// Exercise 3
const prices = [99, 150, 75, 120, 200];
const sortedPriceByExpensive = prices?.sort(
  (price1, price2) => price2 - price1
);
// console.log(sortedPriceByExpensive);

// Exercise 4
const projects = [
  { name: "Project A", duration: 12, status: "completed" },
  { name: "Project B", duration: 8, status: "ongoing" },
  { name: "Project C", duration: 10, status: "ongoing" },
  { name: "Project D", duration: 6, status: "completed" },
];
const filteredProjectByStatus = projects?.filter(
  (project) => project?.status == "ongoing"
);
const sortedProjectStatusByAscend = filteredProjectByStatus?.sort(
  (p1, p2) => p1?.duration - p2?.duration
);
// console.log(sortedProjectStatusByAscend);

// Exercise 5
const filteredProjectByCompleted = projects?.filter(
  (project) => project?.status == "completed"
);
const sortedProjectCompletedByAscend = filteredProjectByCompleted?.sort(
  (p1, p2) => p1?.duration - p2?.duration
);
// console.log(sortedProjectCompletedByAscend);

// Exercise 6
const sortedProjectByAscend = projects?.sort(
  (p1, p2) => p1?.duration - p2?.duration
);
// console.log(sortedProjectByAscend);

// Exercise 7
const gadgets = [
  { name: "iPhone", brand: "Apple", quantity: 2 },
  { name: "Galaxy S21", brand: "Samsung", quantity: 5 },
  { name: "iPad", brand: "Apple", quantity: 3 },
  { name: "Pixel 5", brand: "Google", quantity: 1 },
];

const filteredGadgetsByBrand = gadgets?.filter((g) => g?.brand == "Apple");
const sortedGadgetsBrandByAscend = filteredGadgetsByBrand?.sort(
  (g1, g2) => g1?.quantity - g2?.quantity
);
// console.log(sortedGadgetsBrandByAscend);

// Exercise 8
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Smartphone", price: 800 },
  { name: "Tablet", price: 600 },
  { name: "Monitor", price: 300 },
  { name: "Keyboard", price: 100 },
];
const sortedProductPriceByAscend = products?.sort(
  (p1, p2) => p1?.price - p2?.price
);
// console.log(sortedProductPriceByAscend);

// Exercise 9
const cars = [
  { make: "Toyota", model: "Camry", year: 2015 },
  { make: "Honda", model: "Accord", year: 2008 },
  { make: "Tesla", model: "Model 3", year: 2020 },
  { make: "Ford", model: "Fusion", year: 2009 },
];
const sortedCarManufacturingYearByAscend = cars?.sort(
  (c1, c2) => c1?.year - c2?.year
);
// console.log(sortedCarManufacturingYearByAscend);

// Exercise 10
const athletes = [
  { name: "John", score: 85 },
  { name: "Mike", score: 92 },
  { name: "Sara", score: 88 },
  { name: "Linda", score: 95 },
];
const filteredAthleteByScore = athletes?.filter((a) => a?.score > 90);
// console.log(filteredAthleteByScore);

// Exercise 11
const students = [
  { name: "Alex", grade: "B", marks: 75 },
  { name: "Bella", grade: "A", marks: 90 },
  { name: "Chris", grade: "C", marks: 58 },
  { name: "Diana", grade: "A", marks: 80 },
];
const filteredStudentsByGrade = students?.filter((s) => s?.grade == "A");
const sortedStudentsMarksByDescend = filteredStudentsByGrade?.sort(
  (s1, s2) => s2?.marks - s1?.marks
);
// console.log(sortedStudentsMarksByDescend);

// Exercise 12
const employees = [
  { name: "Raman", department: "Engineering", salary: 70000 },
  { name: "Samiksha", department: "Marketing", salary: 55000 },
  { name: "Ronak", department: "Engineering", salary: 80000 },
  { name: "Siddharth", department: "Sales", salary: 60000 },
];
const filteredEmployeeByDepartment = employees?.filter(
  (e) => e?.department == "Engineering"
);
const sortedEmployeeDepartmentDescend = filteredEmployeeByDepartment?.sort(
  (e1, e2) => e2?.salary - e1?.salary
);
// console.log(sortedEmployeeDepartmentDescend);

// Exercise 13
const employees1 = [
  { name: "Raman", department: "Engineering", salary: 70000 },
  { name: "Samiksha", department: "Marketing", salary: 55000 },
  { name: "Ronak", department: "Engineering", salary: 50000 },
  { name: "Kevin", department: "Marketing", salary: 50000 },
  { name: "Siddharth", department: "Sales", salary: 60000 },
];
const filteredEmployeeByDepartment2 = employees1?.filter(
  (e) => e?.department == "Marketing"
);
const sortedEmployeeDepartmentByAscend = filteredEmployeeByDepartment2?.sort(
  (e1, e2) => e1?.salary - e2?.salary
);
// console.log(sortedEmployeeDepartmentByAscend);

//   Exercise 14
const employees2 = [
  { name: "Eve", department: "Engineering", salary: 70000 },
  { name: "Sam", department: "Marketing", salary: 55000 },
  { name: "John", department: "Engineering", salary: 80000 },
  { name: "Lucy", department: "Sales", salary: 60000 },
];

const filteredEmployeeBySalaryGreater = employees2?.filter(
  (e) => e?.salary >= 60000
);
const sortedEmployeeBySalaryGreater = filteredEmployeeBySalaryGreater?.sort(
  (e1, e2) => e2 - e1
);
// console.log(sortedEmployeeBySalaryGreater);

// Exercise 15
const filteredEmployeeBySalaryLess = employees2?.filter(
  (e) => e?.salary <= 70000
);
const sortedEmployeeBySalaryLess = filteredEmployeeBySalaryLess?.sort(
  (e1, e2) => e1 - e2
);
// console.log(sortedEmployeeBySalaryLess);
