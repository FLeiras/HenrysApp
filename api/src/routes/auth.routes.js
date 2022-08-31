const express = require("express");
const { register } = require("../controllers/users.controllers");

const router = express.Router();

router.post("/", register);

module.exports = router;
