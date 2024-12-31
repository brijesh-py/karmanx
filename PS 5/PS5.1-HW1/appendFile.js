const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "application_log.txt");
try {
  const newLog =
    "\n[Timestamp] [INFO] [ShippingModule] Order #A1234 has been shipped.";
  fs.appendFileSync(filePath, newLog);
  console.log("New log entry appended successfully.");
} catch (error) {
  console.error("Error writing to file:", error.message);
}
