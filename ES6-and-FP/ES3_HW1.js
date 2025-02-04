// 1. Write an arrow function with default parameters that calculates the area of a rectangle.
const rectangleArea = (length = 5, width = 3) => length * width;
console.log(rectangleArea()); // Output: 15
console.log(rectangleArea(4)); // Output: 12

// 2. Write an arrow function with default parameters that concatenates two strings.
const concatenateStrings = (w1, w2 = "neoG") => w1 + w2;
console.log(concatenateStrings("Hello", "World")); // Output: HelloWorld
console.log(concatenateStrings("Hello")); // Output: Hello neoG

// 3. Write an arrow function with radius and height as default parameter with values 2 and 4 respectively, to calculate the volume of a cylinder.
const cylinderVolume = (radius = 2, height = 4) =>
  Math.PI * (radius * radius) * height;
console.log(cylinderVolume(3)); // Output: 113.09733552923255
console.log(cylinderVolume(3, 5)); // Output: 141.3716694115407

// 4. Write an arrow function with price and quantity as default parameters to calculate the total cost of a shopping cart.
const shoppingCartTotal = (price = 0, quantity = 1) => price * quantity;
console.log(shoppingCartTotal(10)); // Output: 10
console.log(shoppingCartTotal(15, 3)); // Output: 45
console.log(shoppingCartTotal()); // Output: 0

// 5. Write and arrow function with default parameters that generates a user profile. It should take a username, age, and country as parameters.
const generateUserProfile = (
  username = "Guest",
  age = 25,
  country = "unknown"
) => `Username: ${username}, Age: ${age}, Country: ${country}`;
console.log(generateUserProfile()); // Output: Username: Guest, Age: 25, Country: Unknown

console.log(generateUserProfile("Alice", 30, "USA")); // Output: Username: Alice, Age: 30, Country: USA

// 6. Convert this function into an arrow function with default parameter.

//      function sum(a, b) {
//         if (b === undefined) {
//            b = 5;
//         }
//        return a + b;
//      };
const sum = (a, b = 5) => a + b;
console.log(sum(2, 4)); // Output: 6
console.log(sum(3)); // Output: 8

// 7. Write an arrow function with base and exponent as default parameters to calculate the power of a number.
const calculatePower = (base = 2, exponent = 2) => base ** exponent;
console.log(calculatePower(2, 3)); // Output: 8
console.log(calculatePower(5)); // Output: 25

// 8. Write an arrow function with default parameters that calculates the area of a triangle. The function should take the base and height as parameters.
const triangleArea = (base, height = 4) => (1 / 2) * (base * height);
console.log(triangleArea(5)); // Output: 10
console.log(triangleArea(3, 6)); // Output: 9

// 9. Write an arrow function with default parameters that concatenates two strings. The function should take str1 and str2 as params.
const concatenateStrings1 = (str1, str2 = "") => str1 + str2;
console.log(concatenateStrings1("Good")); // Output: Good
