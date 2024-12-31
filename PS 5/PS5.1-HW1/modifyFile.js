const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "application_log.txt");
// console.log(filePath); // File Path

try {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const replaceToContent =
    "Payment processing taking longer than expected for Order #A1234.";
  const replaceByContent =
    "Payment for Order #A1234 has been processed successfully.";
  const modifiedContent = fileContent?.replace(
    replaceToContent,
    replaceByContent
  );
  fs.writeFileSync(filePath, modifiedContent);
  console.log("File has been modified and saved to application_log.txt file");
} catch (error) {
  console.error("Error reading file:", error.message);
}
