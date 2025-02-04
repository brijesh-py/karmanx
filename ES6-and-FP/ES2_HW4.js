// 1. Write an arrow function that calculates the average of an array of numbers. Print the average.
// Expected output: 10
const calculateAverage = (arr) => {
  const sumOfArr = arr.reduce((acc, num) => acc + num);
  return sumOfArr / arr.length;
};
console.log(calculateAverage([5, 10, 15])); // 10

// 2. Write an arrow function that reverses a string using for-loop. Print the reversed string.
// Expected output: dlrow
const reverseString = (str) => {
  let reversedStr = "";
  for (let i = str.length; i > 0; i--) reversedStr += str[i - 1];
  return reversedStr;
};

console.log(reverseString("world")); // dlrow

// 3. Write an arrow function that returns the longest word in an array of words. Print the longest word.
// Expected output: grapefruit
const findLongestWord = (wordArr) => {
  let longestWord = wordArr[0];
  for (const word of wordArr) {
    if (longestWord.length < word.length) longestWord = word;
  }
  return longestWord;
};

console.log(findLongestWord(["apple", "banana", "grapefruit"])); // grapefruit

// 4. Write an arrow function that calculates the length of a string using for-loop. Print the length.
// Expected output: 5
const calculateStringLength = (str) => str?.length;
console.log(calculateStringLength("hello")); // 5

// 5. Given an array of objects:
const students = [
  { name: "Alice", age: 20, grade: 85 },
  { name: "Bob", age: 22, grade: 92 },
  { name: "Charlie", age: 19, grade: 88 },
];

//  5.1 Write an arrow function to calculate the average grade of all students.
const calculateAverageGrade = (students) => {
  const sumOfGrade = students.reduce((acc, student) => acc + student.grade, 0);
  return (sumOfGrade / students.length).toFixed(2);
};
console.log("Average Grade: ", calculateAverageGrade(students)); // 88.33

// 5.2 Write an arrow function that takes the array of students and returns an array of their names.
// Expected output: ["Alice", "Bob", "Charlie"]
const getNames = (students) => students.map((student) => student.name);
console.log(getNames(students)); // ["Alice", "Bob", "Charlie"]

// 5.3 Write an arrow function that calculates the average age of students in the array.
const calculateAverageAge = () => {
  const sumOfAge = students.reduce((acc, student) => acc + student.age, 0);
  return (sumOfAge / students.length).toFixed(2);
};
console.log(calculateAverageAge(students)); // 20.33

// 5.4 Write an arrow function that filters the students with a grade greater than or equal to 90. Use for-loops.
// Expected output: [{ name: "Bob", age: 22, grade: 92 }]
const highGrades = (students) => {
  let highGradeStudent = students.filter((student) => student.grade >= 90);
  return highGradeStudent;
};
console.log(highGrades(students)); // [{ name: "Bob", age: 22, grade: 92 }]

// 5.5 Write an arrow function that checks if there is any student below the age of 18.
//  Expected output: false
const isAnyBelow18 = (students) =>
  students.find((student) => student.age < 18) ? true : false;
console.log(isAnyBelow18(students)); // false

// 5.6 Write an arrow function to find a student by their name.
// Expected output: { name: "Charlie", age: 19, grade: 88 }
const findStudentByName = (students, name) =>
  students.find((student) => student.name == name);
console.log(findStudentByName(students, "Charlie")); // { name: "Charlie", age: 19, grade: 88 }

// 5.7 Write an arrow function to get the names of students who have scored grade above 85.
// Expected output: ["Bob", "Charlie"]
const getHighScoreStudents = (students) => {
  const studentNames = [];
  for (const student of students) {
    if (student.grade > 85) studentNames.push(student.name);
  }
  return studentNames;
};
console.log(getHighScoreStudents(students)); // ["Bob", "Charlie"]
