const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/userValidateToken");

const ImageController = require("../controllers/ImageController");

// POST
// router.post("/:masterId/:reviewId",validateToken, ImageController.uploadReviewImage);
router.post("/:masterId/:reviewId", ImageController.uploadReviewImage);


module.exports = router;
