// Question 1: Given data for some students.
// name	rollNo	hindi	english	maths
// Rahul	101	80	75	90
// Amit	102	85	70	95
// Priya	103	78	92	87
// Convert the table into an array of objects.
const studentsData = [
  { name: "Rahul", rollNo: 101, marks: { hindi: 80, english: 75, maths: 90 } },
  { name: "Amit", rollNo: 102, marks: { hindi: 85, english: 70, maths: 95 } },
  { name: "Priya", rollNo: 103, marks: { hindi: 78, english: 92, maths: 87 } },
];
// Add marks for computers for each student respectively.
const marksForComputer = [88, 92, 95];
for (const index in studentsData) {
  studentsData[index]["marks"]["computer"] = marksForComputer[index];
}
// 1.1 Print the studentsData using for loops.
for (const element of studentsData) {
  console.log(
    `Name: ${element.name}, RollNo: ${element.rollNo}, Hindi: ${element.marks.hindi}, English: ${element.marks.english}, Maths: ${element.marks.maths}, Computer: ${element.marks?.computer}`
  );
}
// 1.2 Add marks for one more subject, science. Then print the updated studentsData with Science marks.
const marksForScience = [82, 90, 88];
for (const index in studentsData) {
  studentsData[index]["marks"]["science"] = marksForScience[index];
}
for (const element of studentsData) {
  console.log(
    `Name: ${element.name}, RollNo: ${element.rollNo}, Hindi: ${element.marks.hindi}, English: ${element.marks.english}, Maths: ${element.marks.maths}, Computer: ${element.marks?.computer}, Science: ${element.marks?.science}`
  );
}

// Question 2: Another student Kaveri joins the class. Add Kaveri's data to studentsData.
// Kaveri	104	84	88	78	90	86
// 2.1 Convert Kaveri's data to an object and print it.
const Kaveri = {
  name: "Kaveri",
  rollNo: 104,
  marks: { hindi: 84, english: 88, maths: 78, computer: 90, science: 86 },
};
console.log(Kaveri);

// 2.2  Add Kaveri's data to studentsData. Then print the updated studentsData with Kaveri's data.
studentsData.push(Kaveri);
for (const element of studentsData) {
  console.log(
    `Name: ${element.name}, RollNo: ${element.rollNo}, Hindi: ${element.marks.hindi}, English: ${element.marks.english}, Maths: ${element.marks.maths}, Computer: ${element.marks?.computer}, Science: ${element.marks?.science}`
  );
}

// 2.3 Add a field totalMarks to every object in the array. Then print the updated studentsData with totalMarks.
for (const index in studentsData) {
  const marks = studentsData[index].marks;
  const totalMarks =
    marks.hindi +
    marks.english +
    marks.maths +
    marks?.computer +
    marks?.science;
  studentsData[index]["totalMarks"] = totalMarks;
}
for (const element of studentsData) {
  console.log(
    `Name: ${element.name}, RollNo: ${element.rollNo}, Total Marks: ${element.totalMarks}`
  );
}

// 2.4 Calculate the average marks and add avgMarks to each object. Then print the updated studentsData with avgMarks.
for (const index in studentsData) {
  const totalMarks = studentsData[index]?.totalMarks || 0;
  const avgMarks = totalMarks / 5;
  studentsData[index]["avgMarks"] = avgMarks;
}
for (const element of studentsData) {
  console.log(
    `Name: ${element.name}, RollNo: ${element.rollNo}, Average Marks: ${element?.avgMarks}`
  );
}

// Question 3: Write a function to calculate the grade for each student. Grade conditions have been provided below.
// Condition	Grade
// If avgMarks is from 90 to 100 - A
// If avgMarks is from 80 to 89 - B
// If avgMarks is from 70 to79 - C
// If avgMarks is from 60 to 69 - D
// If avgMarks is from 50 to 59 - E
// If avgMarks is below 50 - F
// Print report cards for each student.
const getGrade = (marks) => {
  if (marks >= 90) return "A";
  if (marks >= 80) return "B";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  if (marks >= 50) return "E";
  return "F"
};

const calculateGrade = (rollNo) => {
  const student = studentsData.find((element) => element.rollNo === rollNo);
  if (!student) return;
  console.log(`===== Report Cart for ${student.name} =====`);
  console.log(`Role No: ${rollNo}`);
  console.log("-----------");
  console.log("Marks");
  console.log("-----------");
  for (const element in student.marks) {
    console.log(`${element}: ${student.marks[element]}`);
  }
  console.log("-----------");
  console.log(`Total: ${student.totalMarks}`);
  console.log(`Average: ${student.avgMarks}`);
  console.log(`Grade: ${getGrade(student.avgMarks)}`);
};
calculateGrade(101);
