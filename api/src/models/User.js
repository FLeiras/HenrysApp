"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Order, {
        as: "order",
        through: "users_orders",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(["customer", "employee", "admin"]),
        defaultValue: "customer",
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      imgUri: {
        type: DataTypes.TEXT,
      },
      isGoogle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      favoritesList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
