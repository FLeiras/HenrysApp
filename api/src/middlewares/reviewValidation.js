const { body } = require("express-validator");

const descriptionValid = body("description")
  .notEmpty()
  .withMessage("description is required")

const postValidator = [descriptionValid];

module.exports = {
  postValidator,
};
