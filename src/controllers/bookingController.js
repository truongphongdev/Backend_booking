import {
  handleCreateBooking,
  handleGetAllBooking,
  handleGetBookingById,
  handleDeleteBooking,
  handleUpdateBooking,
  handleGetHistoryByPatientId,
  handleGetBookingsByDoctorId,
} from "../services/bookingService.js";

// 1. Tạo lịch hẹn
const createBooking = async (req, res) => {
  try {
    const data = req.body;
    const result = await handleCreateBooking(data);

    // Trả về kết quả từ service
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi create booking:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};

// 2. Lấy chi tiết lịch hẹn theo ID
const getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await handleGetBookingById(id); // Sửa 'phong' thành 'result'

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi get booking by id:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};

// 3. Lấy tất cả lịch hẹn
const getAllBooking = async (req, res) => {
  try {
    const result = await handleGetAllBooking(); // Sửa 'phong' thành 'result'

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi get all booking:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};

// 4. Cập nhật lịch hẹn
const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await handleUpdateBooking(id, data);

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi update booking:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};

// 5. Xóa lịch hẹn
const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await handleDeleteBooking(id); // Sửa 'phong' thành 'result'

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi delete booking:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};
const getBookingHistory = async (req, res) => {
  try {
    // Lấy patientId từ query string: /api/booking-history?patientId=123
    const patientId = req.query.patientId;

    const result = await handleGetHistoryByPatientId(patientId);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi get history booking:", error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: null,
    });
  }
};
// Controller cho Bác sĩ xem lịch
const getBookingsForDoctor = async (req, res) => {
  try {
    const doctorId = req.query.doctorId;
    const date = req.query.date; // Có thể null nếu muốn lấy tất cả

    const data = await handleGetBookingsByDoctorId(doctorId, date);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
export {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingHistory,
  getBookingsForDoctor,
};
