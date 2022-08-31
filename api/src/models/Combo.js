"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    static associate(models) {
      Combo.belongsToMany(models.Burger, {
        as: "burger",
        through: "combos_burgers",
      });
      Combo.belongsToMany(models.Beverage, {
        as: "beverage",
        through: "combos_beverages",
      });
      Combo.belongsToMany(models.Fries, {
        as: "fries",
        through: "combos_fries",
      });
    }
  }
  Combo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
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
        defaultValue: "combos",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Combo",
      paranoid: true,
      timestamps: true,
    }
  );
  return Combo;
};
