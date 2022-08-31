const { body, param } = require("express-validator");
const ingredientRepository = require("../repositories/ingredient.repositories");
const burgerRepository = require("../repositories/burger.repositories");
const userRepositories = require("../repositories/user.repositories");
const { burgerRoles, authRoute } = require("../utils/routesRoles");

const ingredientsValid = body("ingredients")
  .custom(async (ingredients) => {
    for (let i = 0; i < ingredients?.length; i++) {
      const id = ingredients[i];
      const res = await ingredientRepository.getById(id);

      if (!res) {
        throw new Error(`Ingredient with id ${id} not exists!`);
      }
    }
  })
  .withMessage("ingredient invalid!");

const nameValid = body("name")
  .notEmpty()
  .withMessage("name is required")
  .custom(async (name, { req }) => {
    const result = await burgerRepository.getByName(name);

    if (req.body.id && result && req.body.id !== result.id) {
      throw new Error("burger already exists");
    }

    if (!req.body.id && result) {
      throw new Error("burger already exists");
    }
  })
  .withMessage("burger already exists");

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

// const imgUriValid = body("imgUri")
//   .notEmpty()
//   .withMessage("img required")
//   .isURL()
//   .withMessage("img invalid");

const roleValid = body("user")
  .custom(async (user) => {
    const myUser = await userRepositories.getById(user.id);
    const hasRole = authRoute(burgerRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const postValidator = [
  ingredientsValid,
  nameValid,
  priceValid,
  isVeggieValid,
  // imgUriValid,
];

const roleValidator = [roleValid];

module.exports = {
  postValidator,
  roleValidator,
};
