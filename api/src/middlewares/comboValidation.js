const { body } = require("express-validator");
const burgerRepository = require("../repositories/burger.repositories");
const comboRepository = require("../repositories/combo.repositories");
const beverageRepository = require("../repositories/beverage.repositories");
const friesRepository = require("../repositories/fries.repositories");
const userRepositories = require("../repositories/user.repositories");
const { comboRoles, authRoute } = require("../utils/routesRoles");

const burgerValid = body("burgers")
  .custom(async (burgers) => {
    for (let i = 0; i < burgers?.length; i++) {
      const id = burgers[i];
      const res = await burgerRepository.getById(id);

      if (!res) {
        throw new Error(`Burger with id ${id} not exists!`);
      }
    }
  })
  .withMessage("burgers invalid!");

const beverageValid = body("beverages")
  .custom(async (beverages) => {
    for (let i = 0; i < beverages?.length; i++) {
      const id = beverages[i];
      const res = await beverageRepository.getById(id);

      if (!res) {
        throw new Error(`Beverage with id ${id} not exists!`);
      }
    }
  })
  .withMessage("beverages invalid!");

const friesValid = body("fries")
  .custom(async (fries) => {
    for (let i = 0; i < fries?.length; i++) {
      const id = fries[i];
      const res = await friesRepository.getById(id);

      if (!res) {
        throw new Error(`Fries with id ${id} not exists!`);
      }
    }
  })
  .withMessage("fries invalid!");

const nameValid = body("name")
  .notEmpty()
  .withMessage("name is required")
  .custom(async (name, { req }) => {
    const result = await comboRepository.getByName(name);

    if (req.body.id && result && req.body.id !== result.id) {
      throw new Error("Combo already exists");
    }

    if (!req.body.id && result) {
      throw new Error("Combo already exists");
    }
  })
  .withMessage("Combo already exists");

// .custom(async (name) => {
//   const result = await comboRepository.getByName(name);
//   if (result) {
//     throw new Error("combo already exists");
//   }
// })
// .withMessage("combo already exists");

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
    const hasRole = authRoute(comboRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const postValidator = [
  burgerValid,
  beverageValid,
  friesValid,
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
