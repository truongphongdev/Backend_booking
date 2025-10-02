"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfoDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfoDoctor.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  InfoDoctor.init(
    {
      doctorId: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      certificate: DataTypes.STRING,
      biography: DataTypes.TEXT,
      experience: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "InfoDoctor",
    }
  );
  return InfoDoctor;
};
