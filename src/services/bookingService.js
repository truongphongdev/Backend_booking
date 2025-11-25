import db from "../models/index.cjs";

const handleCreateBooking = async (data) => {
  // Bắt đầu transaction
  const t = await db.sequelize.transaction();

  try {
    const {
      dateBooking,
      description,
      timeStart,
      timeEnd,
      patientId,
      scheduleId,
      services,
    } = data;

    if (!services || services.length === 0) {
      await t.rollback();
      return {
        EM: "Vui lòng chọn ít nhất một dịch vụ",
        EC: 1,
        DT: null,
      };
    }

    const newBooking = await db.Booking.create(
      {
        dateBooking,
        status: "pending",
        timeStart,
        timeEnd,
        description,
        patientId,
        scheduleId,
      },
      { transaction: t }
    );

    const serviceList = await db.Service.findAll({
      where: { id: services },
      raw: true,
    });

    if (serviceList.length === 0) {
      await t.rollback();
      return { EM: "Dịch vụ không tồn tại", EC: 2, DT: null };
    }

    const payload = serviceList.map((s) => ({
      bookingId: newBooking.id,
      serviceId: s.id,
      priceAtBooking: s.price,
    }));

    await db.BookingService.bulkCreate(payload, { transaction: t });

    await t.commit();

    return {
      EM: "Tạo lịch thành công",
      EC: 0,
      DT: newBooking,
    };
  } catch (error) {
    await t.rollback();
    console.log("Lỗi khi đặt lịch:", error);
    return { EM: "Lỗi hệ thống khi đặt lịch", EC: -1, DT: null };
  }
};

const handleGetAllBooking = async () => {
  try {
    const bookings = await db.Booking.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "phone", "address", "email"],
        },
        {
          model: db.Schedule,
          include: [
            {
              model: db.User,
              attributes: ["id", "fullName"],
            },
          ],
        },
        {
          model: db.Service,
          as: "services",
          attributes: ["id", "nameService", "price"],
          through: {
            attributes: ["priceAtBooking"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
      nest: true,
    });

    return {
      EM: "Lấy thành công danh sách đặt lịch",
      EC: 0,
      DT: bookings,
    };
  } catch (error) {
    console.log("Lỗi khi lấy lịch hẹn: ", error);
    return {
      EM: "Lỗi khi lấy lịch hẹn",
      EC: 1,
      DT: [],
    };
  }
};

const handleGetBookingById = async (id) => {
  try {
    const booking = await db.Booking.findOne({
      where: { id },
      include: [
        {
          model: db.User,
          attributes: ["id", "fullName", "phone", "email"],
        },
        {
          model: db.Schedule,
          include: [{ model: db.User, attributes: ["fullName"] }],
        },
        {
          model: db.Service,
          as: "services",
          attributes: ["id", "nameService", "price"],
          through: {
            attributes: ["priceAtBooking"],
          },
        },
      ],
      nest: true,
    });

    if (!booking) {
      return {
        EM: "Không tìm thấy lịch hẹn",
        EC: 2,
        DT: null,
      };
    }

    return {
      EM: "Lấy thành công lịch đặt",
      EC: 0,
      DT: booking,
    };
  } catch (error) {
    console.log("Lỗi khi lấy lịch hẹn: ", error);
    return {
      EM: "Lỗi khi lấy lịch hẹn",
      EC: 1,
      DT: null,
    };
  }
};

const handleUpdateBooking = async (id, newData) => {
  try {
    // Update booking
    const [affectedRows] = await db.Booking.update(newData, {
      where: { id },
    });

    if (affectedRows === 0) {
      return {
        EM: "Không tìm thấy booking",
        EC: 1,
        DT: null,
      };
    }

    const updatedBooking = await db.Booking.findOne({
      where: { id },
    });

    return {
      EM: "Cập nhật người lịch đặt công",
      EC: 0,
      DT: updatedBooking,
    };
  } catch (error) {
    console.log("Lỗi update booking:", error);
    return {
      EM: "Lỗi khi cập nhật đặt lịch",
      EC: 1,
      DT: null,
    };
  }
};

const handleDeleteBooking = async (id) => {
  try {
    const affectedRows = await db.Booking.destroy({
      where: { id },
    });

    if (affectedRows === 0) {
      return {
        EM: "Không tìm thấy Booking",
        EC: 1,
        DT: null,
      };
    }

    return {
      EM: "Xóa booking thành công",
      EC: 0,
      DT: null,
    };
  } catch (error) {
    console.log("Lỗi delete booking:", error);
    return {
      EM: "Lỗi khi xóa booking",
      EC: 1,
      DT: null,
    };
  }
};
const handleGetHistoryByPatientId = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!patientId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter: patientId",
        });
      } else {
        const data = await db.Booking.findAll({
          where: { patientId: patientId },
          include: [
            {
              model: db.User,

              attributes: ["email", "fullName", "address", "phone"],
            },
            {
              model: db.Service,
              as: "services",
              attributes: ["nameService", "price", "description"],
              through: { attributes: [] },
            },
            {
              model: db.Schedule,
              include: [{ model: db.User, attributes: ["fullName"] }],
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      console.log(">>> Lỗi Service:", error);
      reject(error);
    }
  });
};
const handleGetBookingsByDoctorId = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter: doctorId",
        });
        return;
      }

      // Tạo điều kiện query
      let whereCondition = {};
      if (date) {
        // Nếu có truyền ngày -> Lọc theo ngày
        whereCondition.dateBooking = date;
      }

      const bookings = await db.Booking.findAll({
        where: whereCondition, // Lọc theo ngày (nếu có)
        include: [
          {
            model: db.User, // Lấy thông tin Bệnh nhân
            attributes: ["id", "email", "fullName", "phone", "address"],
          },
          {
            model: db.Schedule, // JOIN bảng Schedule để lọc theo DoctorID
            where: { doctorId: doctorId }, // <--- MẤU CHỐT Ở ĐÂY
            attributes: ["timeStart", "timeEnd", "doctorId"],
          },
          {
            model: db.Service, // Lấy tên dịch vụ
            as: "services",
            attributes: ["nameService"],
            through: { attributes: [] },
          },
        ],
        raw: false,
        nest: true,
        order: [
          ["dateBooking", "ASC"],
          ["timeStart", "ASC"],
        ], // Sắp xếp theo ngày giờ
      });

      resolve({
        errCode: 0,
        data: bookings,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export {
  handleCreateBooking,
  handleGetAllBooking,
  handleGetBookingById,
  handleDeleteBooking,
  handleUpdateBooking,
  handleGetHistoryByPatientId,
  handleGetBookingsByDoctorId,
};
