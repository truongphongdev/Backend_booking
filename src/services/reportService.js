import db from "../models/index.cjs";
import { Op, Sequelize } from "sequelize";
import moment from "moment"; // Cần cài thư viện này ở backend: npm install moment

const getDetailedReports = async (startDate, endDate) => {
  try {
    // 1. CHUẨN BÓA NGÀY THÁNG (Rất quan trọng để chạy vòng lặp)
    let start, end;

    if (startDate && endDate) {
      start = moment(startDate).startOf("day");
      end = moment(endDate).endOf("day");
    } else {
      // Mặc định: Từ ngày 1 tháng hiện tại đến hết hôm nay
      start = moment().startOf("month");
      end = moment().endOf("day");
    }

    const dateCondition = {
      createdAt: { [Op.between]: [start.toDate(), end.toDate()] },
    };

    // --- A, B, C: CÁC QUERY CŨ GIỮ NGUYÊN ---

    // A. Top Dịch vụ
    const topServices = await db.BookingService.findAll({
      attributes: [
        "serviceId",
        [Sequelize.fn("SUM", Sequelize.col("priceAtBooking")), "totalRevenue"],
        [Sequelize.fn("COUNT", Sequelize.col("serviceId")), "totalCount"],
      ],
      include: [
        { model: db.Service, attributes: ["nameService"] },
        { model: db.Booking, attributes: [], where: dateCondition },
      ],
      group: ["serviceId"],
      order: [[Sequelize.literal("totalRevenue"), "DESC"]],
      limit: 5,
      raw: true,
      nest: true,
    });

    // B. Top Bác sĩ
    const payments = await db.Payment.findAll({
      where: { status: "success", ...dateCondition },
      include: [
        {
          model: db.Booking,
          include: [
            {
              model: db.Schedule,
              include: [{ model: db.User, attributes: ["fullName"] }],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    const doctorStats = {};
    payments.forEach((p) => {
      const docName = p.Booking?.Schedule?.User?.fullName || "Unknown";
      if (!doctorStats[docName]) doctorStats[docName] = 0;
      doctorStats[docName] += Number(p.amount);
    });
    const topDoctors = Object.entries(doctorStats)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // C. Trạng thái
    const statusStats = await db.Booking.findAll({
      where: dateCondition,
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    // ---------------------------------------------------------
    // D. XỬ LÝ DOANH THU THEO NGÀY (FULL NGÀY)
    // ---------------------------------------------------------

    // B1: Lấy dữ liệu thô từ DB (chỉ những ngày có tiền)
    const rawRevenue = await db.Payment.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%d/%m"),
          "dateStr",
        ], // Trả về dạng '24/11'
        [Sequelize.fn("SUM", Sequelize.col("amount")), "revenue"],
      ],
      where: {
        status: "success",
        ...dateCondition,
      },
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%d/%m")],
      raw: true,
    });

    // B2: Tạo vòng lặp để lấp đầy ngày thiếu (Fill Gaps)
    const fullRevenueData = [];

    // Copy biến start ra một biến chạy (để không ảnh hưởng biến gốc)
    let currentCursor = start.clone();

    while (currentCursor.isSameOrBefore(end)) {
      // Tạo string ngày tháng format giống SQL: DD/MM (VD: 24/11)
      // Nếu bạn muốn hiển thị trục hoành chỉ là ngày (1, 2, 3...) thì đổi thành format('DD')
      const dateKey = currentCursor.format("DD/MM");

      // Tìm xem ngày này có trong dữ liệu DB trả về không
      const found = rawRevenue.find((item) => item.dateStr === dateKey);

      fullRevenueData.push({
        date: dateKey,
        revenue: found ? Number(found.revenue) : 0, // Nếu có thì lấy tiền, không có thì bằng 0
      });

      // Cộng thêm 1 ngày
      currentCursor.add(1, "days");
    }

    // TRẢ VỀ KẾT QUẢ
    return {
      EM: "OK",
      EC: 0,
      DT: {
        topServices,
        topDoctors,
        statusStats,
        revenueByDate: fullRevenueData, // Trả về mảng đã được lấp đầy
      },
    };
  } catch (error) {
    console.log(error);
    return { EM: "Error", EC: -1, DT: null };
  }
};

export { getDetailedReports };
