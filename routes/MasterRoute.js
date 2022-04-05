const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");

router.post("/signup", MasterController.signUp);

module.exports = router;
