import {
  getAllSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "../services/specialtyService.js";

// ... Các hàm cũ ...

// 1. Get All
const handleGetAllSpecialties = async (req, res) => {
  try {
    let response = await getAllSpecialties();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: "Error server" });
  }
};

// 2. Create
const handleCreateSpecialty = async (req, res) => {
  try {
    let response = await createSpecialty(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: "Error server" });
  }
};

// 3. Update
const handleUpdateSpecialty = async (req, res) => {
  try {
    let response = await updateSpecialty(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: "Error server" });
  }
};

// 4. Delete
const handleDeleteSpecialty = async (req, res) => {
  try {
    let response = await deleteSpecialty(req.params.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: "Error server" });
  }
};

export {
  // ... cũ
  handleGetAllSpecialties,
  handleCreateSpecialty,
  handleUpdateSpecialty,
  handleDeleteSpecialty,
};
