import { getDetailedReports } from "../services/reportService.js"; // Import từ file service bạn vừa tạo

const handleGetDetailedReports = async (req, res) => {
  try {
    // Lấy startDate, endDate từ query string (?startDate=2025-11-01&endDate=2025-11-30)
    const { startDate, endDate } = req.query;
    const data = await getDetailedReports(startDate, endDate);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy báo cáo",
      EC: -1,
      DT: null,
    });
  }
};

export { handleGetDetailedReports };
