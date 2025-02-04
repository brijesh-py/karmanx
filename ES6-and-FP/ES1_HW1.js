// 1. Write a program to increment age by 1 if birthday.

const isBirthday = true;
let age = 25;
console.log("Program 1:");
console.log(`Current Age: ${age}`); // Current Age: 25
if (isBirthday) age++;
console.log(`Updated Age: ${age}`); // Current Age: 26
console.log("\n");

// 2. The condition has been written to print the message. Declare all the necessary variables needed and calculate ticket price based on age. Use appropriate declarations. If the passenger age is greater than 60, then there is a 15% discount on the ticket price.

const passengerAge = 57;
const ticketPrice = 100;

if (passengerAge > 60) {
  const discountPercentage = 15;
  const discountedPrice =
    ticketPrice - ticketPrice * (discountPercentage / 100);
  console.log(`Ticket price for age greater than 60: ${discountedPrice}`);
} else {
  console.log(`Ticket price for age less than or equal to 60: ${ticketPrice}`);
}
console.log("\n");

// 3. Declare three variables, num1, num2 and num3 and write a program to find out if third number the largest. Print appropriate message as per the values taken.
const num1 = 21;
const num2 = 22;
const num3 = 23;
if (num1 < num3 && num2 < num3) {
  console.log(`The third number ${num3} is the largest.`); // The third number 23 is the largest.
} else {
  console.log(`The third number ${num3} is not largest.`);
}

// 4. Define four items (Saree, Kurta, Jeans, Shoes) and their respective prices in a shopping cart. Use appropriate variable declarations. Calculate the total cart price by summing up the individual prices of all items.

// Determine the delivery charge status based on the total cart price. If the total cart price is less than 1999, set an optional delivery charge of 99 and update the total cart price accordingly. If the total cart price is 1999 or more, indicate "No Delivery Charge" in the delivery charge status. Finally print the Shopping Cart with Optional Delivery Charge.
const items = [
  { name: "Saree", price: 500 },
  { name: "Kurta", price: 300 },
  { name: "Jeans", price: 900 },
  { name: "Shoes", price: 400 },
];
let totalPrice = 0;
console.log("Shopping Cart:");
console.log("--------------------------------");
for (const item of items) {
  totalPrice += item["price"];
  console.log(`Item ${item["name"]}, Price: ${item["price"]}`);
}
let deliveryChargeMessage = "No Delivery Charge";
if (totalPrice < 1999) {
  totalPrice += 99;
  deliveryChargeMessage = 99;
}
console.log("--------------------------------");
console.log(`Delivery Charges: ${deliveryChargeMessage}`); // Delivery Charges: No Delivery Charge
console.log("--------------------------------");
console.log(`Total Cart Price: ${totalPrice}`); // Total Cart Price: 2100

// 5. Declare appropriate variable and write code to check if a number is positive or negative.
// If the number is greater than zero, print a message indicating that the number is positive.
// If the number is less than zero, print a message indicating that the number is negative.
// If the number is exactly zero, print a message indicating that the number is zero.
const number = 1;
if (number > 0) console.log("The number is Positive"); // The number is Positive
if (number == 0) console.log("The number is exactly Zero");
if (number < 0) console.log("The number is Negative");

// 6. Find the students with highest marks. Declare three variables marks1, marks2 and marks3 to represent the marks of three students. Assign them the values 85, 90, and 78, respectively. Declare three variables for student names student1, student2 and student3. Assign them the values Rahul, Priya, and Tina, respectively.
// If student1 has the highest marks, print a message to the console indicating that student 1 has the highest marks, in the following format: "Rahul has the highest marks: {marks1}". Print similar message if any other student has highest marks.
const marks1 = 85,
  student1 = "Rahul";
const marks2 = 90,
  student2 = "Priya";
const marks3 = 78,
  student3 = "Tina";

if (marks1 > marks2 && marks1 > marks3) {
  console.log(`${student1} has the highest marks: ${marks1}`);
} else if (marks2 > marks1 && marks2 > marks3) {
  console.log(`${student2} has the highest marks: ${marks2}`); // Priya has the highest marks: 90
} else {
  console.log(`${student3} has the highest marks: ${marks3}`);
}
