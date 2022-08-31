"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init(
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [1, 30],
        },
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.DATEONLY, // aaaa-mm-dd
        allowNull: false,
      },
      imgUri: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      discountPorcentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 100,
        },
      },
      productsId: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Coupon",
      paranoid: true,
      timestamps: true,
    }
  );
  return Coupon;
};
