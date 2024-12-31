const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "application_log.txt");
// console.log(filePath); // File Path

try {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent?.trim()?.split("\n")?.length);
} catch (error) {
  console.error("Error reading file:", error.message);
}
