const express = require("express");
const router = express.Router();
const { ValidateLogin } = require("../middleware/ValidateLogin");

const userController = require("../controllers/UserController");

router.post("/login", ValidateLogin, userController.sendLogIn);

module.exports = router;
