import express from "express";
import dotenv from "dotenv";
import initWebRoutes from "./routes/web.js";
import db from "./models/index.cjs";
const { sequelize } = db;

dotenv.config();

const app = express();

// init all web routes
initWebRoutes(app);

// Test the database connection
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  sequelize.close();
  process.exit(1);
}

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
