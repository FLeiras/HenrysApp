const express = require("express");
const {
  create,
  get,
  destroy,
  restore,
  update,
} = require("../controllers/ingredient.controllers");
const validationResultHandler = require("../middlewares/validationResultHandler");
const {
  postValidator,
  deleteValidator,
  roleValidator,
} = require("../middlewares/ingredientValidation");
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
router.get("/", get);
router.delete(
  "/:id",
  verifyToken,
  roleValidator,
  deleteValidator,
  validationResultHandler,
  destroy
);
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
