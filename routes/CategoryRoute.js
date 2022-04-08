const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

// GET
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.sendLessonCat);

module.exports = router;
