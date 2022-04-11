const express = require("express");
const validateToken = require("../middleware/userValidateToken");
const router = express.Router();

const ReceiveController = require("../controllers/ReceiveController");

router.get("/estimate/:userId", validateToken, ReceiveController.getReceive);
router.post("/estimate", validateToken, ReceiveController.postReceive);

module.exports = router;