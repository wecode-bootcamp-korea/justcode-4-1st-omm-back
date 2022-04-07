const express = require("express");
const router = express.Router();

const MasterController = require("../controllers/MasterController");
// Get
router.get("/search", MasterController.sendMasters);

// GET
router.get("/profile/:masterId", MasterController.getMasterProfile);

// PUT
router.put("/profile", MasterController.setMasterProfile);

// POST
router.post("/signup", MasterController.signUp);

module.exports = router;
