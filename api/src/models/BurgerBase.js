"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BurgerBase extends Model {}
  BurgerBase.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imgUri: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isVeggie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "burgerBase",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BurgerBase",
      paranoid: true,
      timestamps: true,
    }
  );
  return BurgerBase;
};
