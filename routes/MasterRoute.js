const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");

const masterValidateToken = require("../middleware/masterValidateToken");

// GET
router.get("/profile", masterValidateToken, MasterController.getMasterProfile);
router.get("/list", MasterController.sendMasters);
router.get("/main_list/:category", MasterController.getMastersByCategory);
router.get("/users/:id", MasterController.sendMasterDetail);

// POST
router.post("/signup", MasterController.signUp);

// PUT
router.put("/profile", MasterController.setMasterProfile);

module.exports = router;
