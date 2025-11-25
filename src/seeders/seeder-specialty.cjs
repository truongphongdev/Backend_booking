"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Specialty",
      [
        {
          nameSpecialty: "Khám tổng quát & Phục Hình Răng Sứ",
          description:
            "Khám tổng quát, chuyên sâu về bọc răng sứ, dán sứ Veneer, phục hồi chức năng nhai và thẩm mỹ.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameSpecialty: "Niềng Răng - Chỉnh Nha",
          description:
            "Điều trị các sai lệch về khớp cắn, răng hô, móm, khấp khểnh bằng mắc cài hoặc khay trong suốt.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameSpecialty: "Tiểu Phẫu & Nhổ Răng",
          description:
            "Thực hiện các ca nhổ răng khôn (răng số 8), phẫu thuật cắt chóp, phẫu thuật nha chu.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Specialty", null, {});
  },
};
