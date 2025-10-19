"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group, { foreignKey: "groupId" });
      User.hasOne(models.InfoDoctor, { foreignKey: "doctorId" });
      User.belongsTo(models.Clinic, { foreignKey: "clinicId" });
      User.hasMany(models.Schedule, { foreignKey: "doctorId" });

      User.hasMany(models.Booking, {
        as: "BookingsAsPatient",
        foreignKey: "patientId",
      });
      User.hasMany(models.Booking, {
        as: "BookingsAsDoctor",
        foreignKey: "doctorId",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      birthDate: DataTypes.DATE,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
