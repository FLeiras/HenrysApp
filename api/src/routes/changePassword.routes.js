const express = require("express");
const { changePassword } = require("../controllers/changePassword.controllers");
const verifyToken = require("../middlewares/tokenValidation");

const router = express.Router();

router.put("/", verifyToken, changePassword);

module.exports = router;
