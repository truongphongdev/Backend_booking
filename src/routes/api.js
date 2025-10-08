import express from "express";
import {
  testApi,
  createUser,
  handleGetUserById,
  handleGetAllUser,
  handleEditUser,
  handleDeleteUser,
} from "../controller/apiController.js";

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
  router.get("/getAllUser", handleGetAllUser);
  router.get("/getUser/:id", handleGetUserById);
  router.put("/editUser/:id", handleEditUser);
  router.delete("/deleteUser/:id", handleDeleteUser);

  return app.use("/api", router);
};

export default initApiRoutes;
