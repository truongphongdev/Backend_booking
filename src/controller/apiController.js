import { createNewUser } from "../service/userService.js";

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

// test api
const testApi = (req, res) => {
  return res.status(200).json({
    message: "Oke",
    data: "test api",
  });
};

export { testApi, createUser };
