const express = require("express");
const { getByQuery, getById } = require("../controllers/product.controllers");

const router = express.Router();

router.get("/", getByQuery);
router.get("/:id", getById);

module.exports = router;
