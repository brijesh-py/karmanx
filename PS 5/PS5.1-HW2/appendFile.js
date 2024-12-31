const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "restrictedFile.txt");
try {
  const newLog = "Add a new log entry here.";
  fs.appendFileSync(filePath, newLog);
  console.log("New log entry appended successfully.");
} catch (error) {
  console.error("Error writing to file:", error.message);
}
