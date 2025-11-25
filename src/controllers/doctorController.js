import { getAllDoctors, createDoctor } from "../services/doctorService.js";

const handleGetAllDoctors = async (req, res) => {
  try {
    const data = await getAllDoctors();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ EM: "Error", EC: -1 });
  }
};

const handleCreateDoctor = async (req, res) => {
  try {
    const data = await createDoctor(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ EM: "Error", EC: -1 });
  }
};

export { handleGetAllDoctors, handleCreateDoctor };
