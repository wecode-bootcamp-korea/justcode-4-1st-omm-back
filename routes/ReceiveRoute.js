const express = require("express");
const router = express.Router();

const ReceiveController = require("../controllers/ReceiveController");

router.get("/estimate", ReceiveController.getReceive);

module.exports = router;