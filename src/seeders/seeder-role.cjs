"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Thêm 3 vai trò: Admin, Doctor, Patient
     */
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          nameRole: "Admin",
          description: "Quản trị viên hệ thống, có toàn quyền.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameRole: "Doctor",
          description: "Bác sĩ, người cung cấp dịch vụ khám bệnh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameRole: "Patient",
          description: "Bệnh nhân, người đặt lịch hẹn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Chạy khi undo//
     */
    await queryInterface.bulkDelete("Role", null, {});
  },
};
