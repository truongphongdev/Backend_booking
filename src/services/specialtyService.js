import db from "../models/index.cjs";

// 1. Lấy tất cả
const getAllSpecialties = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialties = await db.Specialty.findAll({
        // attributes: ["id", "nameSpecialty", "description"], // Lấy thêm description
        raw: true,
      });
      resolve({ EM: "Lấy danh sách thành công", EC: 0, DT: specialties });
    } catch (e) {
      reject(e);
    }
  });
};

// 2. Tạo mới
const createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({ EM: "Tên chuyên khoa không được để trống", EC: 1, DT: "" });
      } else {
        await db.Specialty.create({
          nameSpecialty: data.name,
          description: data.description,
          image: data.image || "", // Nếu có upload ảnh
        });
        resolve({ EM: "Tạo chuyên khoa thành công", EC: 0, DT: "" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// 3. Cập nhật
const updateSpecialty = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialty = await db.Specialty.findOne({ where: { id: id } });
      if (specialty) {
        specialty.nameSpecialty = data.name;
        specialty.description = data.description;
        await specialty.save();
        resolve({ EM: "Cập nhật thành công", EC: 0, DT: "" });
      } else {
        resolve({ EM: "Chuyên khoa không tồn tại", EC: 2, DT: "" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// 4. Xóa
const deleteSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialty = await db.Specialty.findOne({ where: { id: id } });
      if (specialty) {
        await db.Specialty.destroy({ where: { id: id } });
        resolve({ EM: "Xóa thành công", EC: 0, DT: "" });
      } else {
        resolve({ EM: "Chuyên khoa không tồn tại", EC: 2, DT: "" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export { getAllSpecialties, createSpecialty, updateSpecialty, deleteSpecialty };
