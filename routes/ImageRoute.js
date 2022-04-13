const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/userValidateToken");

const ImageController = require("../controllers/ImageController");

// POST
router.post("/", validateToken, ImageController.uploadReviewImage);


module.exports = router;
