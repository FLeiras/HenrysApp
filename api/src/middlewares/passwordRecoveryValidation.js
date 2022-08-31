const { body, param } = require("express-validator");
const userRepository = require("../repositories/user.repositories");

const emailValid = body("email")
  .notEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("email invalid")
  .custom(async (email) => {
    const user = await userRepository.getByEmail(email);
    if (!user || user.isGoogle) {
      throw new Error("email invalid");
    }
  })
  .withMessage("");

const emailValidation = [emailValid];

module.exports = {
  emailValidation,
};
