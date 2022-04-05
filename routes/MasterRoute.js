const express = require("express");
const router = express.Router();

const masterController = require("../controllers/MasterController");

router.post("/signup", masterController.signUp);

module.exports = router;
