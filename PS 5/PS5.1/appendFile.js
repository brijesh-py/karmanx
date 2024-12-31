const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "log.txt");
// console.log(filePath); // File Path

try {
  fs.appendFileSync(
    filePath,
    "\n2024-10-23 14:32:28 [PID: 1248] [TID: 5692] [TAG: WARN] [PACKAGE: model.payment] [PRIORITY: WARN] payment failed."
  );
} catch (error) {
  console.error("Error writing to file:", error.message);
}
