const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "task_log.txt");
// console.log(filePath); // File Path

try {
  // Question 1: Read and Print the Task Log
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent);

  // Question 2: Count Log Entries by Severity
  const data = fileContent?.trim()?.split("\n");
  const severityCounts = {
    INFO: 0,
    WARN: 0,
    ERROR: 0,
    DEBUG: 0,
    FATAL: 0,
  };
  for (const log of data) {
    if (log.includes("INFO")) {
      severityCounts.INFO++;
    } else if (log.includes("WARN")) {
      severityCounts.WARN++;
    } else if (log.includes("ERROR")) {
      severityCounts.ERROR++;
    } else if (log.includes("DEBUG")) {
      severityCounts.DEBUG++;
    } else if (log.includes("FATAL")) {
      severityCounts.FATAL++;
    }
  }

  console.log(severityCounts);
} catch (error) {
  console.error("Error reading file:", error.message);
}
