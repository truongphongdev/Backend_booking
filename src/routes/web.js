import { handleGetAllUsers } from "../controller/controller.js";

/**
 *
 * @param {*} app express app
 */
const initWebRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.get("/user", handleGetAllUsers);
};

export default initWebRoutes;
