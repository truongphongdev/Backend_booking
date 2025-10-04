import db from "../models/index.cjs";

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      raw: true,
      attributes: ["id", "fullName", "email", "address"],
      include: { model: db.Group, attributes: ["id", "groupName"] },
      nest: true,
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (userData) => {};

export { registerUser, getAllUsers };
