const express = require("express");
const router = express.Router();

const AddressController = require("../controllers/AddressController");

// GET
router.get("/", AddressController.getAddress);

module.exports = router;
