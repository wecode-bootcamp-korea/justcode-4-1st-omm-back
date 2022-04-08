const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");

const masterValidateToken = require("../middleware/masterValidateToken");

// GET
router.get("/profile", masterValidateToken, MasterController.getMasterProfile);
router.get("/list", MasterController.sendMasters);
router.get("/main_list/:category", MasterController.getMastersByCategory);

// PUT
router.put("/profile", MasterController.setMasterProfile);

// POST
router.post("/signup", MasterController.signUp);

module.exports = router;
