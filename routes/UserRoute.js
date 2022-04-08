const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { ValidateLogin } = require("../middleware/ValidateLogin");
const userValidateToken = require("../middleware/userValidateToken");

// POST
router.post("/login", ValidateLogin, UserController.sendLogIn);
router.post("/signup", UserController.signup);

// GET
router.get("/", userValidateToken, UserController.getUser);

module.exports = router;
