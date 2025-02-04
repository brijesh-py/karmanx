// 1. Write an arrow function that creates an object using shorthand property values.
const createPerson = (name, age) => ({ name, age });
console.log(createPerson("Alice", 25)); // Output: { name: "Alice", age: 25 }

console.log(createPerson("Bob", 30)); // Output: { name: "Bob", age: 30 }

// 2. Write an arrow function that creates an object with default values using shorthand property values.
const createFruit = (name = "Apple", color = "Red") => ({ name, color });
console.log(createFruit()); // Output: { name: "Apple", color: "Red" }

console.log(createFruit("Banana", "Yellow")); // Output: { name: "Banana", color: "Yellow" }

// 3. Write an arrow function that creates an object using shorthand property values.
const createBookObj = (title, author) => ({ title, author });
console.log(
  createBookObj("The Great Gatsby", "F. Scott Fitzgerald", "Classic")
);
// Output: { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" }

console.log(createBookObj("The Beatles Anthology", "The Beatles", "Music"));
// Output: { title: "The Beatles Anthology", author: "The Beatles", genre: "Music" }

// 4. Write an arrow function that creates an object with default values using shorthand property values.
const createBook = (
  bookName = "The Hitchhiker's Guide to the Galaxy",
  author = "Douglas Adams"
) => ({ bookName, author });
console.log(createBook());
// Output: { bookName: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams" }

console.log(createBook("A Suitable Boy", "Vikram Seth"));
// Output: { bookName: "A Suitable Boy", author: "Vikram Seth" }

// 5. You are given two variables. Create an object using shorthand property values and print it.
// 😂 So interesting variable's name.
let aaloo = 1;
let bhaaloo = 2;
console.log({ aaloo, bhaaloo });
// Output: { aaloo: 1, bhaaloo: 2 }

// 6. Write an arrow function `calculateArea` that takes the dimensions of a rectangle (length and width) and returns an object with properties for the length, width, and area, using shorthand property values.
const calculateArea = (length, width) => ({
  length,
  width,
  area: length * width,
});
console.log(calculateArea(5, 8));
// Output: { length: 5, width: 8, area: 40 }

// 7. Write an arrow function `printObjOfArrays` that takes two arrays and returns an object with properties for each array, using shorthand property values.
const printObjOfArrays = (arr1, arr2) => ({ arr1, arr2 });
console.log(printObjOfArrays([1, 2, 3], ["a", "b"]));
// Output: { arr1: [1, 2, 3], arr2: ['a', 'b'] }

// 8. Write an arrow function createTriangle that takes the lengths of three sides of a triangle and returns an object with properties for each side length and the triangle's perimeter, using shorthand property values.
const createTriangle = (side1, side2, side3) => ({
  side1,
  side2,
  side3,
  perimeter: side1 + side2 + side3,
});
console.log(createTriangle(3, 4, 5));
// Output: { side1: 3, side2: 4, side3: 5, perimeter: 12 }

// 9. Write an arrow function `createPoint` that takes x and y coordinates and returns an object representing a 2D point, using shorthand property values.
const createPoint = (x, y) => ({ x, y });
console.log(createPoint(3, 7));
// // Output: { x: 3, y: 7 }

// 10. Write an arrow function `createEmail` that takes a username and domain and returns an object representing an email address, using shorthand property values.
const createEmail = (username, domain) => ({
  username,
  domain,
  fullAddress: username + "@" + domain,
});
console.log(createEmail("john.doe", "example.com"));
// Output: { username: 'john.doe', domain: 'example.com', fullAddress: 'john.doe@example.com' }
