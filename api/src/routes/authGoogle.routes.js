const express = require("express");
const { auth } = require("../controllers/authGoogle.controllers");

const router = express.Router();

router.post("/", auth);

module.exports = router;
