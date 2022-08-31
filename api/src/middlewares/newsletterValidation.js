const { body, param } = require("express-validator");
const userRepositories = require("../repositories/user.repositories");
const { newsletterRoles, authRoute } = require("../utils/routesRoles");

const roleValid = body("user")
  .custom(async (user) => {
    const myUser = await userRepositories.getById(user.id);
    const hasRole = authRoute(newsletterRoles, myUser.role);

    if (!hasRole) {
      throw new Error("This user is unauthorized");
    }
  })
  .withMessage("This user is unauthorized");

const roleValidator = [roleValid];

module.exports = {
  roleValidator,
};
