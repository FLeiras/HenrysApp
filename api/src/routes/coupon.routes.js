const express = require("express");
const {
  createCoupon,
  getAll,
  update,
} = require("../controllers/coupon.controllers");
// const { postValidator } = require("../middlewares/couponValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");
const verifyToken = require("../middlewares/tokenValidation");

const router = express.Router();

router.post("/", verifyToken, createCoupon);
router.put("/", verifyToken, update);
router.get("/", getAll);

module.exports = router;
