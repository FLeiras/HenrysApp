"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fries extends Model {
    static associate(models) {
      Fries.belongsToMany(models.Combo, {
        as: "combo",
        through: "combos_fries",
      });
    }
  }
  Fries.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM(["Chico", "Mediano", "Grande"]),
        allowNull: false,
      },
      imgUri: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isVeggie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "fries",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Fries",
      timestamps: true,
      paranoid: true,
    }
  );
  return Fries;
};
