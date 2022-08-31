const { body, header } = require("express-validator");
const beverageRepository = require("../repositories/beverage.repositories");
const userRepositories = require("../repositories/user.repositories");
const { beverageRoles, authRoute } = require("../utils/routesRoles");

const nameValid = body("name")
  .notEmpty()
  .withMessage("name is required")  
  .custom(async (name) => {
    const result = await beverageRepository.getByName(name);
    if (result) {
      throw new Error("beverage already exists");
    }
  })
  .withMessage("beverage already exists");

const priceValid = body("price")
  .notEmpty()
  .withMessage("price is required")
  .isFloat({ min: 0 })
  .withMessage("invalid price");

const isVeggieValid = body("isVeggie")
  .notEmpty()
  .withMessage("field required")
  .isBoolean()
  .withMessage("invalid value");

const isCarbonatedValid = body("isCarbonated")
  .notEmpty()
  .withMessage("field required")
  .isBoolean()
  .withMessage("invalid value");

const isSugar = body("isSugar")
  .notEmpty()
  .withMessage("field required")
  .isBoolean()
  .withMessage("invalid value");


const sizeValid = body("size")
  .notEmpty()
  .withMessage("size required")
  .custom(async (size) => {
    if (!["Chico", "Mediano", "Grande"].includes(size)) {
      throw new Error('invalid. allowed values: "Chico", "Mediano", "Grande"');
    }
  });

const namePutValid = body("name")
  .custom(async (name, { req }) => {
    const result = await beverageRepository.getByName(name);

    if (req.body.id && result && req.body.id !== result.id) {
      throw new Error("beverage already exists");
    }

    if (!req.body.id && result) {
      throw new Error("beverage already exists");
    }
  })
  .withMessage("beverage already exists");

const roleValid = body("user")
  .custom(async (user) => {
    const myUser = await userRepositories.getById(user.id);
    const hasRole = authRoute(beverageRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const postValidator = [
  nameValid,
  priceValid,
  isVeggieValid,
  sizeValid,
  isCarbonatedValid,
  isSugar,
];

const putValidator = [
  namePutValid,
  priceValid,
  isVeggieValid,
  sizeValid,
  isCarbonatedValid,
  isSugar,
];

const roleValidator = [roleValid];

module.exports = {
  postValidator,
  putValidator,
  roleValidator,
};
