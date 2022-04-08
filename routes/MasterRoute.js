const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");

const _vaildateToken = require("../middleware/masterVaildateToken");

// GET
router.get("/profile", _vaildateToken, MasterController.getMasterProfile);
router.get("/list", MasterController.sendMasters);
router.get("/main_list/:category", MasterController.getMastersByCategory);

// PUT
router.put("/profile", MasterController.setMasterProfile);

// POST
router.post("/signup", MasterController.signUp);

module.exports = router;
