import {
  createPayment,
  getDashboardStats,
  getRecentPayments,
} from "../services/paymentService.js";

const handleCreatePayment = async (req, res) => {
  try {
    const data = await createPayment(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Error server", EC: -1, DT: "" });
  }
};

const handleGetDashboardStats = async (req, res) => {
  try {
    const data = await getDashboardStats();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ EM: "Error server", EC: -1, DT: "" });
  }
};
const handleGetRecentPayments = async (req, res) => {
  try {
    const data = await getRecentPayments();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ EM: "Error", EC: -1, DT: [] });
  }
};
export {
  handleCreatePayment,
  handleGetDashboardStats,
  handleGetRecentPayments,
};
