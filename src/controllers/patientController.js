import { getListPatientsForDoctor } from "../services/patientService.js";

const handleGetListPatients = async (req, res) => {
  try {
    // Lấy doctorId từ query string (API gọi: /api/doctor/patients?doctorId=5)
    // Hoặc lấy từ token req.user.id nếu bạn muốn bảo mật hơn
    const doctorId = req.query.doctorId;

    if (!doctorId) {
      return res
        .status(200)
        .json({ EM: "Thiếu tham số doctorId", EC: 1, DT: [] });
    }

    const data = await getListPatientsForDoctor(doctorId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};

export { handleGetListPatients };
