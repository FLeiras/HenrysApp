const { body, header, param } = require("express-validator");
const jwt = require("jsonwebtoken");
const userRepositories = require("../repositories/user.repositories");
const orderRepositories = require("../repositories/order.repositories");

const roleValid = header("auth-token")
  .custom(async (token) => {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await userRepositories.getById(data.id);
    if (user.role !== "admin" && user.role !== "employee") {
      throw new Error(
        "usuario inválido, se necesitan permisos de empleado o administrador"
      );
    }
  })
  .withMessage(
    "usuario inválido, se necesitan permisos de empleado o administrador"
  );

const statusValid = body("status")
  .custom(async (status) => {
    console.log(status);
    if (!["Pendiente", "Listo"].includes(status)) {
      throw new Error(
        "estado inválido, solo los siguientes estados están permitidos: 'Pendiente', 'Entregado'"
      );
    }
  })
  .withMessage(
    "estado inválido, solo los siguientes estados están permitidos: 'Pendiente', 'Entregado'"
  );

const idValid = param("id")
  .custom(async (id) => {
    const order = await orderRepositories.getById(id);
    if (!order) {
      throw new Error("id inválido");
    }
  })
  .withMessage("id inválido");

const roleValidator = [roleValid];

const putValidator = [statusValid, idValid, roleValid];

module.exports = { roleValidator, putValidator };
