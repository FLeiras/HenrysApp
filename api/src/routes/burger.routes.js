const express = require("express");
const {
  create,
  destroy,
  restore,
  update,
} = require("../controllers/burger.controllers");
const {
  postValidator,
  roleValidator,
} = require("../middlewares/burgerValidation");
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
  postValidator,
  validationResultHandler,
  update
);

module.exports = router;
