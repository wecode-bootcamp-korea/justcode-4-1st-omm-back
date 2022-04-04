const express = require("express");
const router = express.Router();

const masterController = require("../controllers/MasterController");

router.get("/:category", masterController.sendCategories);
router.get("/profile/users/:id", masterController.sendMasterDetail);

router.post("/welcome/:category", masterController.signUp);

module.exports = router;
