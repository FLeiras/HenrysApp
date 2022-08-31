const express = require("express");
const { getAll, create, remove } = require("../controllers/review.controllers");
const { postValidator } = require("../middlewares/reviewValidation");
const verifyToken = require("../middlewares/tokenValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");

const router = express.Router();

router.post("/", postValidator, validationResultHandler, create);
router.get("/", getAll);
router.delete("/:id", remove);

module.exports = router;
