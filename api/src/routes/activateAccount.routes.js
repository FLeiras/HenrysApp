const express = require("express");
const {
  activateAccount,
} = require("../controllers/activateAccount.controllers");

const router = express.Router();

router.put("/:id", activateAccount);

module.exports = router;
