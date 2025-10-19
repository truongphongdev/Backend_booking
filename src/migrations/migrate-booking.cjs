"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Booking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("S1", "S2", "S3", "S4"),
        allowNull: false,
        defaultValue: "S1",
      },
      typeBooking: {
        type: Sequelize.ENUM("T1", "T2"),
      },
      dateBooking: {
        type: Sequelize.DATE,
      },
      timeBooking: {
        type: Sequelize.TIME,
      },
      note: {
        type: Sequelize.STRING,
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Booking");
  },
};
