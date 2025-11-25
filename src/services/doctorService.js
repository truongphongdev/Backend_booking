import db from "../models/index.cjs";
import bcrypt from "bcrypt";

const saltRounds = 10;

// 1. Lấy danh sách tất cả bác sĩ (Kèm chuyên khoa)
const getAllDoctors = async () => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: 2 }, // Chỉ lấy Role Bác sĩ
      attributes: ["id", "fullName", "email", "phone", "address"], // Thêm trường isActive nếu có
      distinct: true,
      include: [
        {
          model: db.DoctorInfo,
          include: [{ model: db.Specialty, attributes: ["nameSpecialty"] }],
        },
      ],
      raw: true,
      nest: true,
    });
    return { EM: "OK", EC: 0, DT: doctors };
  } catch (e) {
    // 👇 THÊM DÒNG NÀY ĐỂ SOI LỖI 👇
    console.log("====================================");
    console.log(">>> LỖI CHI TIẾT:", e);
    console.log("====================================");
    return { EM: "Error service", EC: -1, DT: [] };
  }
};

// 2. Tạo Bác sĩ mới (Tạo User + Tạo DoctorInfo rỗng)
const createDoctor = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    // Check email tồn tại
    const check = await db.User.findOne({ where: { email: data.email } });
    if (check) return { EM: "Email đã tồn tại", EC: 1 };

    const hashPass = await bcrypt.hash(data.password || "123456", saltRounds);

    // Tạo User
    const newUser = await db.User.create(
      {
        email: data.email,
        passWord: hashPass,
        fullName: data.fullName,
        address: data.address,
        phone: data.phone,
        roleId: 2, // Role Bác sĩ
        // isActive: true // Nếu DB có cột này
      },
      { transaction: t }
    );

    // Tạo thông tin chuyên khoa (Nếu có gửi lên)
    if (data.specialtyId) {
      await db.DoctorInfo.create(
        {
          doctorId: newUser.id,
          specialtyId: data.specialtyId,
          // Các trường khác để null hoặc mặc định
          bio: "",
          lever: "",
          avatar: "",
        },
        { transaction: t }
      );
    }

    await t.commit();
    return { EM: "Tạo bác sĩ thành công", EC: 0 };
  } catch (e) {
    await t.rollback();
    console.log(e);
    return { EM: "Error create doctor", EC: -1 };
  }
};

// 3. Cập nhật thông tin Bác sĩ (Admin sửa)
const updateDoctor = async (data) => {
  // Logic tương tự hàm updateDoctorInfo bạn đã làm, nhưng dùng quyền Admin
  // ... (Bạn có thể tái sử dụng API updateDoctorInfo cũ cũng được)
  return { EM: "Tính năng đang phát triển", EC: 0 };
};

// 4. Khóa/Mở khóa tài khoản
const toggleDoctorStatus = async (id) => {
  // Logic update trường isActive trong bảng User
  return { EM: "Đã đổi trạng thái", EC: 0 };
};

export { getAllDoctors, createDoctor, updateDoctor, toggleDoctorStatus };
