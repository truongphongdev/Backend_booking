"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Băm mật khẩu một lần
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert(
      "User",
      [
        // === 1. ADMIN ===
        {
          fullName: "Trương Văn phong",
          account: "aminphong",
          email: "adminphong@gmail.com",
          phone: "0814568895",
          passWord: hashedPassword,
          address: "Nam Từ Liêm, Hà Nội",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // === 2. DOCTORS ===
        {
          fullName: "Khổng Văn Quân",
          account: "doctorquan",
          email: "doctorquan@gmail.com",
          phone: "0902657894",
          passWord: hashedPassword,
          address: "456 Bắc Từ Liêm, Hà Nội",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Văn Thanh Nga",
          account: "doctornga",
          email: "doctornga@gmail.com",
          phone: "0956874562",
          passWord: hashedPassword,
          address: "Cầu Giấy, Hà Nội",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Châu Hưng Thịnh",
          account: "doctorthinh",
          email: "doctorthinh@gmail.com",
          phone: "0908785654",
          passWord: hashedPassword,
          address: "Ba Vì, Hanoi",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Chạy khi undo
     */
    await queryInterface.bulkDelete("User", null, {});
  },
};
