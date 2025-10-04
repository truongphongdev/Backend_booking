import express from "express";
import dotenv from "dotenv";
import initApiRoutes from "./routes/api.js";
import db from "./models/index.cjs";
import configCORS from "./config/configCors.js";

const { sequelize } = db;

dotenv.config();

// create express app
const app = express();

// config cors
configCORS(app);

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init all api routes
initApiRoutes(app);

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
