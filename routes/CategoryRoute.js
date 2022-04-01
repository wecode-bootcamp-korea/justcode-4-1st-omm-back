const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

// GET
router.get("/", CategoryController.getCategory);

module.exports = router;
