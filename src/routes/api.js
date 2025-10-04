import express from "express";
import { handleRegisterUser, testApi } from "../controller/apiController.js";

const router = express.Router();
/**
 *
 * @param {*} app express app
 */
const initApiRoutes = (app) => {
  router.get("/test-api", handleRegisterUser);
  router.get("/demo", testApi);

  return app.use("/api", router);
};

export default initApiRoutes;
