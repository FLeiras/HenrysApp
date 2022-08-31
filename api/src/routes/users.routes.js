const express = require("express");
const {
  getAllSecure,
  create,
  destroy,
  restore,
  update,
  updateProfileData,
  getById,
  setFavorites,
  getFavoritesByUserId,
  getAllAdmin,
} = require("../controllers/users.controllers");
const {
  roleValidator,
  deleteValidator,
  putValidator,
} = require("../middlewares/usersValidation");
const validationResultHandler = require("../middlewares/validationResultHandler");
const verifyToken = require("../middlewares/tokenValidation");

const router = express.Router();

router.get(
  "/",
  verifyToken,
  roleValidator,
  validationResultHandler,
  getAllSecure
);

router.get(
  "/admin",
  verifyToken,
  roleValidator,
  validationResultHandler,
  getAllAdmin
);

router.get("/:id", getById);

router.post("/", verifyToken, roleValidator, validationResultHandler, create);
router.delete(
  "/:id",
  verifyToken,
  roleValidator,
  deleteValidator,
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

router.put("/:id", verifyToken, validationResultHandler, updateProfileData);

router.put(
  "/",
  verifyToken,
  roleValidator,
  putValidator,
  validationResultHandler,
  update
);

router.put("/favorites/:id", setFavorites);
router.get("/favorites/:id", getFavoritesByUserId);

module.exports = router;
