const express = require("express");
const {
  create,
  getAll,
  changeStatus,
  getAllByUserId,
  getByPurchaseId,
  changeReview,
} = require("../controllers/order.controllers");
const verifyToken = require("../middlewares/tokenValidation");
const {
  roleValidator,
  putValidator,
} = require("../middlewares/orderValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");

const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, roleValidator, validationResultHandler, getAll);
router.get("/user", verifyToken, validationResultHandler, getAllByUserId);
router.get(
  "/:purchaseId",
  verifyToken,
  validationResultHandler,
  getByPurchaseId
);
router.put(
  "/:id",
  verifyToken,
  putValidator,
  validationResultHandler,
  changeStatus
);
router.put("/reviews/:id", verifyToken, validationResultHandler, changeReview);

module.exports = router;
