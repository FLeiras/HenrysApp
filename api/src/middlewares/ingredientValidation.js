const { body, param } = require("express-validator");
const ingredientRepository = require("../repositories/ingredient.repositories");
const userRepositories = require("../repositories/user.repositories");
const { ingredientRoles, authRoute } = require("../utils/routesRoles");

const nameValid = body("name")
  .notEmpty()
  .withMessage("name is required")
  .custom(async (name, { req }) => {
    const result = await ingredientRepository.getByName(name);

    if (req.body.id && result && req.body.id !== result.id) {
      throw new Error("Ingredient already exists");
    }

    if (!req.body.id && result) {
      throw new Error("Ingredient already exists");
    }
  })
  .withMessage("ingredient already exists");

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

const idValid = param("id")
  .notEmpty()
  .withMessage("id required")
  .custom(async (id) => {
    const result = await ingredientRepository.getById(id);
    if (!result) {
      throw new Error("id invalid");
    }
  })/* 
  .withMessage("id invalid")
  .custom(async (id) => {
    const result = await ingredientRepository.getAssociations(id);
    if (result.burger.length) {
      throw new Error("ingredient has burgers associated");
    }
  })
  .withMessage("ingredient has burgers associated"); */

const roleValid = body("user")
  .custom(async (user) => {
    const myUser = await userRepositories.getById(user.id);
    const hasRole = authRoute(ingredientRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const postValidator = [nameValid, priceValid, isVeggieValid];

const deleteValidator = [idValid];

const roleValidator = [roleValid];

module.exports = {
  postValidator,
  deleteValidator,
  roleValidator,
};
