"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Thêm thông tin chi tiết cho 2 bác sĩ
     */
    await queryInterface.bulkInsert(
      "DoctorInfo",
      [
        {
          avatar:
            "https://nhakhoaviethan.vn/wp-content/uploads/2023/03/Bsi-Thinh.jpg",
          bio: "Bác sĩ Quân được đào tạo chuyên sâu về cấy ghép Implant, phục hồi toàn hàm và phẫu thuật hàm mặt cơ bản. Bác sở hữu nhiều chứng chỉ quốc tế uy tín từ Biotech Dental Academy (Pháp), THL Academy, thành viên của International Team for Implantology (ITI) – tổ chức Implant hàng đầu thế giới. Nền tảng chuyên môn vững chắc và kinh nghiệm lâm sàng phong phú, bác sĩ Quân luôn mang đến những giải pháp tối ưu, an toàn cho bệnh nhân.",
          lever: "Bác sĩ",
          doctorId: 2,
          specialtyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar:
            "https://nhakhoaviethan.vn/wp-content/uploads/2021/12/doctor-3.jpg",
          bio: "Bác sĩ Thanh Nga là một nha sĩ tốt nghiệp từ đại học danh tiếng ở Cộng hòa Belarus. Có chuyên môn nổi bật trong lĩnh vực điều trị tổng quát. Sử dụng thành thạo 3 ngôn ngữ: Tiếng Việt, Tiếng Anh, và Tiếng Nga.",
          lever: "Bác sĩ",
          doctorId: 3,
          specialtyId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          avatar:
            "https://nhakhoaviethan.vn/wp-content/uploads/2021/12/Bs-Quan-1024x1024.jpg",
          bio: "Bác sĩ Thiện Ái được đào tạo chuyên sâu nhiều khóa học trong và ngoài nước về Veneer, Phục hồi toàn miệng và kỹ thuật số hiện đại. Thế mạnh của bác sĩ là phục hình thẩm mỹ xâm lấn tối thiểu, phục hồi toàn miệng và nha khoa tổng quát. Bác sĩ sử dụng thành thạo tiếng Anh, giúp tiếp cận và ứng dụng những tiến bộ quốc tế vào thực hành lâm sàng.",
          lever: "Bác sĩ",
          doctorId: 4,
          specialtyId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DoctorInfo", null, {});
  },
};
