"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Service",
      [
        {
          nameService: "Khám & Tư Vấn Tổng Quát",
          price: 150000,
          duration: 30,
          description:
            "Bác sĩ kiểm tra tình trạng răng miệng tổng thể, phát hiện sâu răng, vôi răng và tư vấn phác đồ điều trị.",
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameService: "Cạo Vôi Răng & Đánh Bóng",
          price: 300000,
          duration: 45,
          description:
            "Làm sạch mảng bám và vôi răng bằng máy siêu âm hiện đại, giúp răng sạch sẽ, hơi thở thơm tho.",
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameService: "Trám Răng Thẩm Mỹ (Composite)",
          price: 500000,
          duration: 45,
          description:
            "Hàn trám răng sâu hoặc răng mẻ bằng vật liệu Composite trùng màu răng, đảm bảo thẩm mỹ.",
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nameService: "Răng Sứ Titan (1 Răng)",
          price: 2500000,
          duration: 60,
          description:
            "Bọc răng sứ thẩm mỹ với sườn hợp kim Titan, chi phí hợp lý, độ bền cao, chịu lực tốt.",
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameService: "Răng Toàn Sứ Zirconia (Cao Cấp)",
          price: 4500000,
          duration: 60,
          description:
            "Răng toàn sứ Zirconia chính hãng, thẩm mỹ tự nhiên như răng thật, không đen viền nướu.",
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nameService: "Tư Vấn Chỉnh Nha & Lấy Dấu Hàm",
          price: 500000,
          duration: 60,
          description:
            "Khám chi tiết, chụp X-quang Panorex/Cephalo và lấy dấu hàm để lên kế hoạch niềng răng.",
          specialtyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameService: "Niềng Răng Mắc Cài Kim Loại (Trọn Gói)",
          price: 30000000,
          duration: 60,
          description:
            "Phương pháp chỉnh nha truyền thống, hiệu quả cao cho mọi trường hợp hô, móm, lệch lạc.",
          specialtyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nameService: "Nhổ Răng Khôn Hàm Trên (Mọc Thẳng)",
          price: 1000000,
          duration: 30,
          description:
            "Tiểu phẫu nhổ răng khôn (răng số 8) hàm trên, trường hợp mọc thẳng, không biến chứng.",
          specialtyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameService: "Nhổ Răng Khôn Mọc Lech/Ngầm (Khó)",
          price: 2500000,
          duration: 60,
          description:
            "Phẫu thuật nhổ răng khôn mọc lệch, mọc ngầm bằng máy Piezotome giảm sang chấn, lành thương nhanh.",
          specialtyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Service", null, {});
  },
};
