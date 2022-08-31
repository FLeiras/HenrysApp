const express = require("express");
const { login } = require("../controllers/login.controllers");

const router = express.Router();

router.post("/", login);

module.exports = router;
