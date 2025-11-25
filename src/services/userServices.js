import db from "../models/index.cjs";
import bcrypt from "bcrypt";

const saltRounds = 10;

// --- CÁC HÀM BỔ TRỢ (HELPER) ---

// 1. Hàm mã hóa mật khẩu
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// 2. Hàm kiểm tra tồn tại (Cái bạn đang thiếu)
const checkFieldExist = async (field, value) => {
  // Tìm trong DB xem có ai dùng email/phone này chưa
  const user = await db.User.findOne({
    where: { [field]: value }, // Dynamic key: field có thể là 'email' hoặc 'phone'
  });
  return !!user; // Nếu có trả về true, không có trả về false
};

// --- CÁC HÀM CHÍNH ---

// 1. Tạo người dùng mới (Register)
const handleCreateNewUser = async (data) => {
  try {
    const { fullName, account, email, phone, password, address } = data;

    // Check email tồn tại
    if (await checkFieldExist("email", email)) {
      return { EM: "Email đã tồn tại", EC: 1, DT: null };
    }
    // Check số điện thoại tồn tại
    if (await checkFieldExist("phone", phone)) {
      return { EM: "Số điện thoại đã tồn tại", EC: 1, DT: null };
    }

    const hashedPass = await hashPassword(password);

    // Tạo user
    const newUser = await db.User.create({
      email: email,
      passWord: hashedPass,
      fullName: fullName,
      address: address,
      phone: phone,
      // Nếu không nhập account thì lấy email làm account luôn
      account: account || email,
      // Mặc định là Bệnh nhân (Role 3)
      roleId: 3,
    });

    // Trả về thông tin (bỏ password đi)
    const { passWord: _, ...userData } = newUser.dataValues;

    return { EM: "Tạo người dùng thành công", EC: 0, DT: userData };
  } catch (error) {
    console.log("🔥 LỖI TẠO USER:", error);
    return { EM: "Lỗi khi tạo người dùng", EC: 1, DT: null };
  }
};

// 2. Lấy danh sách tất cả users
const handleGetAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["passWord"] },
      raw: true,
    });
    return { EM: "OK", EC: 0, DT: users };
  } catch (e) {
    return { EM: "Error", EC: -1, DT: [] };
  }
};

// 3. Lấy user theo ID
const handleGetUserById = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: { exclude: ["passWord"] },
    });
    if (!user) return { EM: "Not found", EC: 2, DT: null };
    return { EM: "OK", EC: 0, DT: user };
  } catch (e) {
    return { EM: "Error", EC: -1, DT: null };
  }
};

// 4. Cập nhật User (Profile)
const handleUpdateUser = async (id, data) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (!user) return { EM: "User not found", EC: 2 };

    if (data.fullName) user.fullName = data.fullName;
    if (data.address) user.address = data.address;
    if (data.phone) user.phone = data.phone;
    if (data.gender) user.gender = data.gender;

    await user.save();
    return { EM: "Update thành công", EC: 0, DT: user };
  } catch (e) {
    console.log(e);
    return { EM: "Error update", EC: -1 };
  }
};

// 5. Xóa User
const handleDeleteUser = async (id) => {
  try {
    await db.User.destroy({ where: { id } });
    return { EM: "Delete thành công", EC: 0 };
  } catch (e) {
    return { EM: "Error delete", EC: -1 };
  }
};

// 6. Đổi quyền User (Admin Only)
const changeUserRole = async (userId, roleId) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) return { EM: "User not found", EC: 2 };

    user.roleId = roleId;
    await user.save();

    return { EM: "Đổi quyền thành công", EC: 0, DT: user };
  } catch (e) {
    return { EM: "Error change role", EC: -1 };
  }
};

export {
  handleCreateNewUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  changeUserRole,
};
