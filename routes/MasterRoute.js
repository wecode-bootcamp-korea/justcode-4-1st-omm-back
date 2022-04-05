const express = require("express");
const router = express.Router();

const masterController = require("../controllers/MasterController");

router.post("/signup", masterController.signUp);
router.get("/search", masterController.sendMasters);

module.exports = router;
