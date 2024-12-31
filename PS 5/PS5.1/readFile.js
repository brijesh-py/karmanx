const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "log.txt");
// console.log(filePath); // File Path

try {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent);
} catch (error) {
  console.error("Error reading file:", error.message);
}
