const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");

// GET
router.get("/:id/pre", ReviewController.sendPreview);
router.get("/:id", ReviewController.sendReviews);

module.exports = router;