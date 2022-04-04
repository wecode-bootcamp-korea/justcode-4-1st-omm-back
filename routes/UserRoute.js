const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { ValidateLogin } = require("../middleware/ValidateLogin");

// GET
router.get("/address", UserController.getAddress);
router.post("/login", ValidateLogin, userController.sendLogIn);

module.exports = router;
