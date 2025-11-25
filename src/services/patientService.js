import db from "../models/index.cjs";

const getListPatientsForDoctor = async (doctorId) => {
  try {
    // Lấy tất cả các cuộc hẹn thông qua Schedule để biết của bác sĩ nào
    const bookings = await db.Booking.findAll({
      // LƯU Ý: Không filter doctorId ở đây nữa vì bảng Booking không có cột này
      include: [
        {
          model: db.Schedule, // 1. Join với bảng Schedule
          where: { doctorId: doctorId }, // 2. Lọc Bác sĩ tại đây (vì Schedule mới có doctorId)
          attributes: [], // Không cần lấy dữ liệu schedule, chỉ dùng để lọc
          required: true, // Chỉ lấy booking nào có lịch hợp lệ
        },
        {
          model: db.User,
          // Lấy thông tin bệnh nhân
          attributes: ["id", "email", "fullName", "address", "phone"],
        },
      ],
      raw: true,
      nest: true,
    });

    // Gom nhóm bệnh nhân (để loại bỏ trùng lặp)
    let uniquePatients = {};

    bookings.forEach((item) => {
      const patientInfo = item.User;

      if (patientInfo && patientInfo.id) {
        const patientId = patientInfo.id;

        if (!uniquePatients[patientId]) {
          // Tách tên để hiển thị đẹp hơn
          let splitName = patientInfo.fullName
            ? patientInfo.fullName.split(" ")
            : ["Bệnh", "Nhân"];
          let firstName = splitName.length > 1 ? splitName.pop() : splitName[0];
          let lastName = splitName.length > 0 ? splitName.join(" ") : "";

          uniquePatients[patientId] = {
            id: patientInfo.id,
            firstName: firstName,
            lastName: lastName,
            email: patientInfo.email,
            phoneNumber: patientInfo.phone, // Map từ cột 'phone' trong DB
            address: patientInfo.address,

            lastVisit: item.createdAt,
          };
        }
      }
    });

    return {
      EM: "Lấy danh sách bệnh nhân thành công",
      EC: 0,
      DT: Object.values(uniquePatients),
    };
  } catch (error) {
    console.log("🔥 CHI TIẾT LỖI SERVICE:", error);
    return {
      EM: "Lỗi hệ thống: " + error.message,
      EC: -1,
      DT: [],
    };
  }
};

export { getListPatientsForDoctor };

/* QUAN TRỌNG: 
Nếu chạy code trên mà bị lỗi "Schedule is not associated to Booking",
Bạn cần vào file models/booking.js và thêm dòng này vào hàm associate:

Booking.belongsTo(models.Schedule, { foreignKey: 'scheduleId', targetKey: 'id' });
*/
