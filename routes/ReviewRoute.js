const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");

// GET
router.get("/", ReviewController.getReviews);

// POST
router.post("/", ReviewController.makeReview);

module.exports = router;