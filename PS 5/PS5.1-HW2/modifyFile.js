const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "task_log.txt");
// console.log(filePath); // File Path

try {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const replaceToContent = "Failed to update task status for Task #T002.";
  const replaceByContent =
    "Task #T002 status successfully updated after retry.";
  const modifiedContent = fileContent?.replace(
    replaceToContent,
    replaceByContent
  );
  fs.writeFileSync(filePath, modifiedContent);
  console.log("File has been modified and saved to task_log.txt file");
} catch (error) {
  console.error("Error reading file:", error.message);
}
