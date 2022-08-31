const express = require("express");
const { recovery } = require("../controllers/passwordRecovery.controllers");

const router = express.Router();
const {
  emailValidation,
} = require("../middlewares/passwordRecoveryValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");

router.post("/", emailValidation, validationResultHandler, recovery); // validar email
// router.post("/", recovery); // validar email

module.exports = router;
