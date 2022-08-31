const express = require("express");
const {
  get,
  create,
  sendEmails,
  destroy,
  restore,
} = require("../controllers/newsletter.controllers");
const verifyToken = require("../middlewares/tokenValidation");
const { roleValidator } = require("../middlewares/newsletterValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");

const router = express.Router();

router.get("/", verifyToken, get);
router.post("/", create);

router.post(
  "/send",
  verifyToken,
  roleValidator,
  validationResultHandler,
  sendEmails
);

router.delete(
  "/:id",
  verifyToken,
  roleValidator,
  validationResultHandler,
  destroy
);
router.post(
  "/:id",
  verifyToken,
  roleValidator,
  validationResultHandler,
  restore
);

module.exports = router;
