const express = require("express");
const router = express.Router();

const masterController = require("../controllers/MasterController");

router.post("/signup", masterController.signUp);
router.get("/users/:id", masterController.sendMasterDetail);

module.exports = router;
