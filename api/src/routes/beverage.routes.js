const express = require("express");
const {
  create,
  destroy,
  restore,
  update,
} = require("../controllers/beverage.controllers");
const {
  postValidator,
  putValidator,
  roleValidator,
} = require("../middlewares/beverageValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");
const verifyToken = require("../middlewares/tokenValidation");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  roleValidator,
  postValidator,
  validationResultHandler,
  create
);
router.delete("/:id", verifyToken, roleValidator, destroy);
router.post("/:id", verifyToken, roleValidator, restore);
router.put(
  "/",
  verifyToken,
  roleValidator,
  putValidator,
  validationResultHandler,
  update
);

module.exports = router;
