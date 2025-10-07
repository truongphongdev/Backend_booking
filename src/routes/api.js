import express from "express";
import { testApi, createUser } from "../controller/apiController.js";

const router = express.Router();
/**
 *
 * @param {*} app express app
 */
const initApiRoutes = (app) => {
  // test api
  router.get("/demo", testApi);

  // api user
  router.post("/create-user", createUser);

  return app.use("/api", router);
};

export default initApiRoutes;
