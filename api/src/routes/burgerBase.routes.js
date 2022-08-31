const express = require("express");
const { get, getFirst, update, create } = require("../controllers/burgerBase.controllers");
const {
  postValidator,
  roleValidator,
} = require("../middlewares/burgerBaseValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");
const verifyToken = require("../middlewares/tokenValidation");

const router = express.Router();

router.get("/", get);
router.get("/first", getFirst);
router.put(
  "/",
  verifyToken,
  roleValidator,
  postValidator,
  validationResultHandler,
  update
);
router.post("/", create);

module.exports = router;
