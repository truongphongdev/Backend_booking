import db from "../models/index.cjs";

// 1. Tạo lịch làm việc (Bác sĩ đăng ký)
// Input: data có thể là 1 object hoặc 1 mảng object (nếu muốn tạo nhiều ngày 1 lúc)
const createSchedule = async (data) => {
  try {
    // data example: { doctorId: 2, dateWork: '2025-11-25', timeStart: '08:00', timeEnd: '17:00', maxPatient: 20 }

    if (!data.doctorId || !data.dateWork || !data.timeStart || !data.timeEnd) {
      return {
        EM: "Thiếu thông tin bắt buộc (doctorId, dateWork, timeStart, timeEnd)",
        EC: 1,
        DT: "",
      };
    }

    // (Optional) Check trùng lặp nếu muốn, nhưng bạn bảo demo cho phép trùng nên mình bỏ qua bước check.

    const schedule = await db.Schedule.create({
      dateWork: data.dateWork,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      maxPatient: data.maxPatient,
      description: data.description,
      doctorId: data.doctorId,
    });

    return {
      EM: "Tạo lịch làm việc thành công",
      EC: 0,
      DT: schedule,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi hệ thống service",
      EC: -1,
      DT: "",
    };
  }
};

// 2. Lấy tất cả lịch (Dành cho Admin quản lý)
const getAllSchedules = async () => {
  try {
    const schedules = await db.Schedule.findAll({
      include: [
        {
          model: db.User, // Lấy tên bác sĩ
          attributes: ["id", "fullName", "email"],
        },
      ],
      nest: true,
      raw: false,
    });
    return {
      EM: "Lấy danh sách lịch thành công",
      EC: 0,
      DT: schedules,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi hệ thống service",
      EC: -1,
      DT: "",
    };
  }
};

// 3. Lấy lịch theo Bác Sĩ và Ngày (QUAN TRỌNG NHẤT)
// Dùng cho FE: Khi bệnh nhân chọn Bác sĩ A và ngày 25/11 -> Hiện ra các ca làm việc
const getScheduleByDate = async (doctorId, date) => {
  try {
    if (!doctorId || !date) {
      return { EM: "Thiếu tham số doctorId hoặc date", EC: 1, DT: "" };
    }

    const schedules = await db.Schedule.findAll({
      where: {
        doctorId: doctorId,
        dateWork: date,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName"],
        },
      ],
      nest: true,
      raw: false,
    });

    return {
      EM: "Lấy lịch theo ngày thành công",
      EC: 0,
      DT: schedules,
    };
  } catch (error) {
    console.log(error);
    return { EM: "Lỗi hệ thống service", EC: -1, DT: "" };
  }
};

// 4. Xóa lịch (Nếu bác sĩ bận đột xuất)
const deleteSchedule = async (id) => {
  try {
    // 1. Kiểm tra xem lịch này có booking nào không
    const countBooking = await db.Booking.count({
      where: { scheduleId: id },
    });

    if (countBooking > 0) {
      return {
        EM: "Không thể xóa lịch này vì đã có bệnh nhân đặt hẹn!",
        EC: 2,
        DT: "",
      };
    }

    // 2. Nếu không có ai đặt thì xóa bình thường
    const schedule = await db.Schedule.findOne({ where: { id } });
    if (!schedule) {
      return { EM: "Lịch không tồn tại", EC: 2, DT: "" };
    }

    await db.Schedule.destroy({ where: { id } });
    return { EM: "Xóa lịch thành công", EC: 0, DT: "" };
  } catch (error) {
    console.log(error);
    return { EM: "Lỗi hệ thống service", EC: -1, DT: "" };
  }
};
// 5. Lấy toàn bộ lịch của 1 bác sĩ (để bác sĩ quản lý)
const getSchedulesByDoctorId = async (doctorId) => {
  try {
    const schedules = await db.Schedule.findAll({
      where: { doctorId: doctorId },
      order: [
        ["dateWork", "ASC"],
        ["timeStart", "ASC"],
      ], // Sắp xếp ngày tăng dần
      raw: true,
    });

    return { EM: "Lấy danh sách lịch thành công", EC: 0, DT: schedules };
  } catch (error) {
    console.log(error);
    return { EM: "Lỗi hệ thống", EC: -1, DT: [] };
  }
};
export {
  createSchedule,
  getAllSchedules,
  getScheduleByDate,
  deleteSchedule,
  getSchedulesByDoctorId,
};
