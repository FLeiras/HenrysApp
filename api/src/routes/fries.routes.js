const express = require("express");
const {
  create,
  destroy,
  update,
  restore,
} = require("../controllers/fries.controllers");
const {
  postValidator,
  putValidator,
  roleValidator,
} = require("../middlewares/friesValidation");
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
