const express = require("express");
const {
  check,
  getPaymentById,
  notification,
} = require("../controllers/mercadopago.controllers");
const verifyToken = require("../middlewares/tokenValidation");
const {
  validatePurchase,
  applyCupons,
} = require("../middlewares/purchaseValidation");

const router = express.Router();

router.post("/mercadopago/notification", notification);
router.post("/mercadopago", verifyToken, validatePurchase, applyCupons, check);
router.get("/mercadopago/:id", verifyToken, getPaymentById);

module.exports = router;
