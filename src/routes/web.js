/**
 *
 * @param {*} app express app
 */
const initWebRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};

export default initWebRoutes;
