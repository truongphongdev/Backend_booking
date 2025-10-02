import { getAllUsers } from "../service/userService.js";

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Lỗi khi lấy users:", error);
    res.status(500).json({ error: error.message });
  }
};
