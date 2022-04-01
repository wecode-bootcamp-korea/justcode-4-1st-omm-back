const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// GET
router.get("/adress", UserController.getAdress);

module.exports = router;
