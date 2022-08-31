"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {}
  }
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      author: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        // type: DataTypes.DECIMAL(4, 2),
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Review",
      paranoid: true,
      timestamps: true,
    }
  );
  return Review;
};
