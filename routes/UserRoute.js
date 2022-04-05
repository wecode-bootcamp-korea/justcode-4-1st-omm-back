const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { ValidateLogin } = require("../middleware/ValidateLogin");

// GET
router.get("/address", UserController.getAddress);

// POST
router.post("/login", ValidateLogin, UserController.sendLogIn);
router.post("/signup", UserController.signup);

module.exports = router;
