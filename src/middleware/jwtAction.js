import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createJWT = () => {
  let payload = { name: "phong", address: "ha noi" };
  let token = null;
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decode = jwt.verify(token, key);
    data = decode;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export { createJWT, verifyToken };
