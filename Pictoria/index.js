require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;
// sequelize.sync({ force: true });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
