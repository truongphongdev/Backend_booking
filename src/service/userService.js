import db from "../models/index.cjs";
import bcrypt from "bcrypt";

const saltRounds = 10;

// hash pass
const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPass = await bcrypt.hash(password, saltRounds);
      resolve(hashPass);
    } catch (e) {
      reject(e);
    }
  });
};

// get id
const getId = async () => {
  try {
  } catch (error) {
    throw error;
  }
};

// check email exist
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

// check phone exist
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phoneNumber: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

// create user
const createNewUser = async (dataNewUser) => {
  try {
    // check unique email and phone
    let isCheckEmail = await checkEmailExist(dataNewUser.email);
    let isCheckPass = await checkPhoneExist(dataNewUser.phoneNumber);

    if (isCheckEmail) {
      return {
        status: "error",
        message: "lỗi trùng email",
      };
    }

    if (isCheckPass) {
      return {
        status: "error",
        message: "lỗi trùng pass",
      };
    }

    // lấy dữ liệu
    const {
      fullName,
      gender,
      birthDate,
      email,
      password,
      phoneNumber,
      address,
    } = dataNewUser;

    // hash pass
    let pass = await hashPassword(password);
    const user = await db.User.create({
      fullName,
      gender,
      birthDate,
      email,
      password: pass,
      phoneNumber,
      address,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// get all user
const getAllUsers = async () => {};

// get user by id
const getUserById = async () => {};

// edit user
const editUser = async () => {};

// delete user
const deleteUser = async () => {};

export { createNewUser, getAllUsers, getUserById, editUser, deleteUser };
