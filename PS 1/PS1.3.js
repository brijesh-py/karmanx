// PS 1.3 - Functions & Operators
// Exercise 1: Report Card Generation
const studentData = [
  { studentName: "John", rollNo: 201, science: 88, history: 75, geography: 90 },
  {
    studentName: "Alice",
    rollNo: 202,
    science: 92,
    history: 85,
    geography: 88,
  },
  { studentName: "Bob", rollNo: 203, science: 78, history: 89, geography: 91 },
];

function generateReportCard(rollNo) {
  const student = studentData?.find((student) => student?.rollNo == rollNo);
  if (student) {
    console.log(`===== Report Cart for ${student?.studentName} =====`);
    console.log(`Roll NO: ${student?.rollNo}`);
    console.log("_______________");
    console.log("Marks: ");
    console.log(`Science: ${student?.science}`);
    console.log(`History: ${student?.history}`);
    console.log(`Geography: ${student?.geography}`);
  } else {
    console.log(`Student not ${rollNo} found.`);
  }
}
// generateReportCard(202);

// Exercise 2: Filter Students by Subject Marks
function filterStudentsByScienceCutoff(cutOff) {
  const students = studentData?.filter((student) => student?.science >= cutOff);
  console.log(students);
}
// filterStudentsByScienceCutoff(80))

// Exercise 3: Filter Students by Average Marks
function filterStudentsByAverageMarks(averageCutOff) {
  for (let student in studentData) {
    const obj = studentData[student];
    const average = (obj?.science + obj?.history + obj?.geography) / 3;
    if (average >= averageCutOff) {
      console.log(
        `${obj?.studentName} has average marks ${average?.toFixed(2)}`
      );
    }
  }
}

// filterStudentsByAverageMarks(85);

// Exercise 4: Find Student with Highest Average Marks
function getStudentWithHighestAverageMarks() {
  let highestAverage = 0;
  let topStudent = "";
  for (let student in studentData) {
    const obj = studentData[student];
    const average = (obj?.science + obj?.history + obj?.geography) / 3;
    if (highestAverage <= average) {
      highestAverage = average;
      topStudent = obj?.studentName;
    }
  }
  console.log(
    `${topStudent} has the highest average marks of ${highestAverage?.toFixed(
      2
    )}`
  );
}
// getStudentWithHighestAverageMarks();

// Exercise 5: Convert Hours to Minutes
function convertToMinutes(hours) {
  const minutes = 60;
  return hours * minutes;
}
const hours = 2;
// console.log(`${hours} hours = ${convertToMinutes(2)} minutes`);

// Exercise 6: Count Occurrences of Character in String
const str = "hello world";
function countOccurrences(str, character) {
  let count = 0;
  for (let char in str) {
    if (str[char] == character) {
      count++;
    }
  }
  return count;
}
const char = "o";
// console.log(`Character '${char}' repeat ${countOccurrences(str, char)} times`);

// Exercise 7: Find the Sum of All Even Numbers in an Array
let numbers = [1, 2, 3, 4, 5, 6];
function sumOfEvenNumbers() {
  let sum = 0;
  for (let ele in numbers) {
    if (numbers[ele] % 2 == 0) {
      sum += numbers[ele];
    }
  }
  return sum;
}
console.log(`The sum of all even numbers is ${sumOfEvenNumbers()}`);
