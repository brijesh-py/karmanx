require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.warn(`Server is running on http://localhost:${PORT}`);
});
