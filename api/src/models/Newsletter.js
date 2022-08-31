"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Newsletter extends Model {
  }
  Newsletter.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Newsletter",
      paranoid: true,
      timestamps: true,
    }
  );
  return Newsletter;
};
