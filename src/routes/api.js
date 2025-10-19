import express from "express";

// User
import {
  testApi,
  createUser,
  handleGetUserById,
  handleGetAllUser,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
} from "../controller/apiController.js";

// Booking
import {
  handleCreateBooking,
  handleGetAllBooking,
  handleGetBookingById,
  handleUpdateBookingById,
  handleDeleteBookingById,
} from "../controller/bookingController.js";

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
  router.post("/login", handleLogin);
  router.get("/getAllUser", handleGetAllUser);
  router.get("/getUser/:id", handleGetUserById);
  router.put("/editUser/:id", handleEditUser);
  router.delete("/deleteUser/:id", handleDeleteUser);

  // api booking
  router.post("/create-booking", handleCreateBooking);
  router.get("/get-all-booking", handleGetAllBooking);
  router.get("/get-booking/:id", handleGetBookingById);
  router.put("/edit-booking/:id", handleUpdateBookingById);
  router.delete("/delete-booking/:id", handleDeleteBookingById);

  return app.use("/api", router);
};

export default initApiRoutes;
