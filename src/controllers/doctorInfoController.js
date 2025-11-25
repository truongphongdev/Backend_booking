import {
  handleCreateDoctorInfo,
  handleGetAllDoctorInfo,
  handleGetDoctorInfoById,
  handleUpdateDoctorInfo, // <--- 1. Import thêm hàm này từ Service
} from "../services/doctorInfo.js";

// 1. Tạo mới
const createDoctorInfo = async (req, res) => {
  try {
    const data = req.body;
    const doctor = await handleCreateDoctorInfo(data);
    res.status(200).json(doctor);
  } catch (error) {
    console.log("loi controller khi tao info doctor", error);
    res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    });
  }
};

// 2. Lấy tất cả
const getAllDoctorInfo = async (req, res) => {
  try {
    const doctors = await handleGetAllDoctorInfo();
    res.status(200).json(doctors);
  } catch (error) {
    console.log("loi controller khi lay all info doctor", error);
    res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    });
  }
};

// 3. Lấy theo ID
const getDoctorInfoById = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await handleGetDoctorInfoById(id);
    res.status(200).json(doctor);
  } catch (error) {
    console.log("loi controller khi lay info doctor by id", error);
    res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    });
  }
};

// 4. Cập nhật (Hàm mới thêm)
const updateDoctorInfo = async (req, res) => {
  try {
    const data = req.body;
    // Gọi hàm service bạn vừa viết lúc nãy
    const response = await handleUpdateDoctorInfo(data);
    res.status(200).json(response);
  } catch (error) {
    console.log("loi controller khi update info doctor", error);
    res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    });
  }
};

// Xuất ra ngoài để dùng ở route
export {
  createDoctorInfo,
  getDoctorInfoById,
  getAllDoctorInfo,
  updateDoctorInfo, // <--- 2. Nhớ export hàm này
};
