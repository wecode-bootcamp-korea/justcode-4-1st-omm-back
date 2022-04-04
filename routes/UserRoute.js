const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// GET
router.get("/address", UserController.getAddress);

module.exports = router;
