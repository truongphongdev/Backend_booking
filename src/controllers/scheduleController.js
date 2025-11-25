import {
  createSchedule,
  getAllSchedules,
  getScheduleByDate,
  deleteSchedule,
  getSchedulesByDoctorId,
} from "../services/scheduleService.js";

const handleCreateSchedule = async (req, res) => {
  try {
    const data = await createSchedule(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};

const handleGetAllSchedules = async (req, res) => {
  try {
    const data = await getAllSchedules();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};

const handleGetScheduleByDate = async (req, res) => {
  try {
    // Lấy doctorId và date từ query string (ví dụ: /api/get-schedule?doctorId=2&date=2025-11-25)
    const { doctorId, date } = req.query;
    const data = await getScheduleByDate(doctorId, date);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};

const handleDeleteSchedule = async (req, res) => {
  try {
    const data = await deleteSchedule(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};
const handleGetSchedulesByDoctorId = async (req, res) => {
  try {
    const doctorId = req.query.doctorId;
    const data = await getSchedulesByDoctorId(doctorId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Lỗi server", EC: -1, DT: "" });
  }
};
export {
  handleCreateSchedule,
  handleGetAllSchedules,
  handleGetScheduleByDate,
  handleDeleteSchedule,
  handleGetSchedulesByDoctorId,
};
