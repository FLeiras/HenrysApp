const { body } = require("express-validator");
const userRepositories = require("../repositories/user.repositories");
const { burgerBaseRoles, authRoute } = require("../utils/routesRoles");

const priceValid = body("price")
  .notEmpty()
  .withMessage("price is required")
  .isFloat({ min: 0 })
  .withMessage("invalid price");

const roleValid = body("user")
  .custom(async (user) => {
    const myUser = await userRepositories.getById(user.id);
    const hasRole = authRoute(burgerBaseRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const postValidator = [priceValid];

const roleValidator = [roleValid];

module.exports = {
  postValidator,
  roleValidator,
};
