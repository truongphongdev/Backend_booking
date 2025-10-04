import { registerUser } from "../service/userService.js";

const handleRegisterUser = async (req, res) => {
  try {
    // if(req.body)
  } catch (error) {
    return res.status(500).json({
      EM: "error from server", // error message
      EC: -1, // error code
      DT: "", // data
    });
  }
};

const testApi = (req, res) => {
  return res.status(200).json({
    message: "Oke",
    data: "test api",
  });
};

export { testApi, handleRegisterUser };
