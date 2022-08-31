"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Burger extends Model {
    static associate(models) {
      Burger.belongsToMany(models.Ingredient, {
        as: "ingredient",
        through: "burgers_ingredients",
      });
      Burger.belongsToMany(models.Combo, {
        as: "combo",
        through: "combos_burgers",
      });
    }
  }
  Burger.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        defaultValue: "burgers",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Burger",
      paranoid: true,
      timestamps: true,
    }
  );
  return Burger;
};
