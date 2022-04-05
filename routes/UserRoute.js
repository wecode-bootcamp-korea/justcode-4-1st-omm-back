const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { ValidateLogin } = require("../middleware/ValidateLogin");

// POST
router.post("/login", ValidateLogin, UserController.sendLogIn);
router.post("/signup", UserController.signup);

module.exports = router;
