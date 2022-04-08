const express = require("express");
const validateToken = require("../middleware/userValidateToken");
const router = express.Router();

const ReceiveController = require("../controllers/ReceiveController");

router.get("/estimate", validateToken, ReceiveController.getReceive);

module.exports = router;