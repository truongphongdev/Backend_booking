"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.User, { foreignKey: "doctorId" });
      Schedule.hasMany(models.Booking, { foreignKey: "scheduleId" });
    }
  }
  Schedule.init(
    {
      date: DataTypes.DATE,
      timeStart: DataTypes.TIME,
      timeEnd: DataTypes.TIME,
      maxNumber: DataTypes.INTEGER,
      currentNumber: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
