const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");

// POST
router.post("/signup", MasterController.signUp);

module.exports = router;
