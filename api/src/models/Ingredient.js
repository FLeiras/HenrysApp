"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      Ingredient.belongsToMany(models.Burger, {
        as: "burger",
        through: "burgers_ingredients",
      });
    }
  }

  Ingredient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
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
      isRepeat: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isVeggie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "ingredients",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ingredient",
      paranoid: true,
      timestamps: true,
    }
  );
  return Ingredient;
};
