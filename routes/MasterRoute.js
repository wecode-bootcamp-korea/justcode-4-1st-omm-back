const express = require("express");
const router = express.Router();

const masterController = require("../controllers/MasterController");

router.get("/search", masterController.sendMasterInfo);
router.get("/:category", masterController.sendCategories);

router.post("/welcome/:category", masterController.signUp);

module.exports = router;
