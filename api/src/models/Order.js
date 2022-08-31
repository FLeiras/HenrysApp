"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.User, {
        as: "customer",
        through: "users_orders",
      });
    }
  }
  Order.init(
    {
      purchaseId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM(["Pendiente", "Listo"]),
        defaultValue: "Pendiente",
      },
      review: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      data: {
        type: DataTypes.JSONB,
      },
      employee: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
      paranoid: true,
      timestamps: true,
    }
  );
  return Order;
};
