import db from "../models/index.cjs";
import { Op } from "sequelize";

// 1. Tạo thanh toán mới
const createPayment = async (data) => {
  try {
    // data: { bookingId, amount, method, note, transactionCode }
    if (!data.bookingId || !data.amount || !data.method) {
      return { EM: "Thiếu thông tin thanh toán", EC: 1, DT: "" };
    }

    // Lưu vào bảng Payments
    const payment = await db.Payment.create({
      bookingId: data.bookingId,
      amount: data.amount,
      method: data.method,
      status: "success", // Giả sử admin bấm là thành công luôn
      transactionCode: data.transactionCode || null,
      note: data.note,
    });

    // Cập nhật trạng thái Booking thành 'completed' hoặc 'paid'
    await db.Booking.update(
      { status: "completed" },
      { where: { id: data.bookingId } }
    );

    return { EM: "Thanh toán thành công", EC: 0, DT: payment };
  } catch (error) {
    console.log(error);
    return { EM: "Lỗi hệ thống service", EC: -1, DT: "" };
  }
};

// 2. Lấy thống kê Dashboard (XỊN XÒ)
const getDashboardStats = async () => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // A. Doanh thu hôm nay
    const revenueToday = await db.Payment.sum("amount", {
      where: {
        status: "success",
        createdAt: { [Op.between]: [startOfDay, endOfDay] },
      },
    });

    // B. Doanh thu tháng này
    const revenueMonth = await db.Payment.sum("amount", {
      where: {
        status: "success",
        createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
      },
    });

    // C. Tổng số đơn tháng này
    const countBookingMonth = await db.Booking.count({
      where: {
        createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
      },
    });

    // D. Đếm số bác sĩ
    const countDoctors = await db.User.count({ where: { roleId: 2 } });

    return {
      EM: "Lấy thống kê thành công",
      EC: 0,
      DT: {
        revenueToday: revenueToday || 0,
        revenueMonth: revenueMonth || 0,
        totalOrders: countBookingMonth || 0,
        totalDoctors: countDoctors || 0,
      },
    };
  } catch (error) {
    console.log(error);
    return { EM: "Lỗi thống kê", EC: -1, DT: "" };
  }
};
const getRecentPayments = async () => {
  try {
    const payments = await db.Payment.findAll({
      limit: 5, // Lấy 5 cái mới nhất
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Booking,
          include: [
            { model: db.User, attributes: ["fullName"] }, // Lấy tên bệnh nhân
          ],
        },
      ],
      raw: false,
      nest: true,
    });
    return { EM: "Lấy danh sách thành công", EC: 0, DT: payments };
  } catch (e) {
    return { EM: "Lỗi service", EC: -1, DT: [] };
  }
};
export { createPayment, getDashboardStats, getRecentPayments };
