import {
  createNewUser,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser,
  handleUserLogin,
} from "../service/userService.js";

// create user
const createUser = async (req, res) => {
  try {
    const dataNewUser = req.body;
    const user = await createNewUser(dataNewUser);
    res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi gọi service createUser: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// get user by id
const handleGetUserById = async (req, res) => {
  try {
    const user = await getUserById(req);
    res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi gọi service getUserById: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// handle get all user
const handleGetAllUser = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log("Lỗi gọi service getAllUser: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// handle edit user
const handleEditUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const newData = req.body;
    const userUpdate = await editUser(idUser, newData);
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log("Lỗi gọi service editUser: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const userDelete = await deleteUser(idUser);
    if (!userDelete) {
      res.status(400).json({ message: "lỗi ko có ngươi dùng này" });
    }
    res.status(200).json(userDelete);
  } catch (error) {
    console.log("Lỗi gọi service delete user: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// test api
const testApi = (req, res) => {
  return res.status(200).json({
    message: "Oke",
    data: "test api",
  });
};

// handle login
const handleLogin = async (req, res) => {
  try {
    let data = await handleUserLogin(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi gọi service delete user: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export {
  testApi,
  createUser,
  handleGetUserById,
  handleGetAllUser,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
};
