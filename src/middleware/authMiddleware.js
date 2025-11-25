import jwt from "jsonwebtoken";
import db from "../models/index.cjs";

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Thiếu Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không có Access Token" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await db.User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["passWord"] },
      raw: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token đã hết hạn, vui lòng đăng nhập lại" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }
    return res.status(500).json({ message: "Lỗi server xác thực" });
  }
};
