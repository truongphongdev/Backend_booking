import db from "../models/index.cjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

const handleLogin = async (account, password) => {
  try {
    // 1. Tìm user
    const user = await db.User.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ account: account }, { email: account }],
      },
      raw: true, // Thêm dòng này để lấy object thuần cho nhanh
    });

    if (!user) {
      return {
        EM: "Tài khoản hoặc email không tồn tại",
        EC: 1,
        DT: null,
      };
    }

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.passWord);
    if (!isMatch) {
      return {
        EM: "Mật khẩu không chính xác",
        EC: 1,
        DT: null,
      };
    }

    // 3. Tạo Token
    const accessToken = jwt.sign(
      { id: user.id, roleId: user.roleId }, // Lưu cả roleId vào token để middleware dùng
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Lưu refresh token
    await db.Token.create({
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
      userId: user.id,
    });

    // 4. TRẢ VỀ KẾT QUẢ (QUAN TRỌNG NHẤT)
    return {
      EM: "Đăng nhập thành công",
      EC: 0,
      DT: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          account: user.account,

          // 👇👇👇 SỬA DÒNG NÀY 👇👇👇
          roleId: user.roleId, // Phải là roleId (số 1, 2, 3) thì Frontend mới hiểu

          // 👇 Thêm luôn mấy cái này để Profile đỡ bị lỗi
          phone: user.phone,
          address: user.address,
        },
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    console.log("Lỗi login:", error);
    return {
      EM: "Lỗi server khi đăng nhập",
      EC: 1,
      DT: null,
    };
  }
};

const handleLogout = async (req, res) => {
  // ... (Giữ nguyên code cũ của bạn) ...
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await db.Token.destroy({ where: { refreshToken: token } });
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return true;
  } catch (error) {
    console.log("Lỗi logout service:", error);
    return false;
  }
};

export { handleLogin, handleLogout };
