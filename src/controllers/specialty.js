// 1. Import service vừa tạo ở trên cùng file
import { getAllSpecialties } from "../services/specialtyService.js";

// ... Các code cũ giữ nguyên ...

// 2. Thêm hàm này xuống dưới cùng (trước phần export)
const handleGetAllSpecialties = async (req, res) => {
  try {
    let response = await getAllSpecialties();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

// 3. Nhớ thêm tên hàm vào danh sách export
export {
  handleGetAllSpecialties, // <--- Thêm cái này
};
