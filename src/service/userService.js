import { raw } from "mysql2";
import db from "../models/index.cjs";
import bcrypt from "bcrypt";
import { where } from "sequelize";

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
const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: [
        "id",
        "fullName",
        "gender",
        "birthDate",
        "email",
        "phoneNumber",
        "address",
      ],
      raw: true,
    });
    return users;
  } catch (e) {
    throw e;
  }
};

// get user by id
const getUserById = async (userId) => {
  try {
    const id = userId.params.id;
    const user = await db.User.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "fullName",
        "gender",
        "birthDate",
        "email",
        "phoneNumber",
        "address",
      ],
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// edit user
const editUser = async (id, newData) => {
  try {
    const userUpdate = await db.User.update(newData, {
      where: {
        id: id,
      },
    });
    return userUpdate;
  } catch (error) {
    throw error;
  }
};

// delete user
const deleteUser = async (id) => {
  try {
    const userDelete = await db.User.destroy({
      where: {
        id: id,
      },
    });
    return userDelete;
  } catch (error) {
    throw error;
  }
};

export { createNewUser, getAllUsers, getUserById, editUser, deleteUser };
