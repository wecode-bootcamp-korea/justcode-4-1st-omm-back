const express = require("express");
const router = express.Router();

const Usercontroller = require("../controllers/UserController");
router.post("/signup", Usercontroller.signup);

module.exports = router;
