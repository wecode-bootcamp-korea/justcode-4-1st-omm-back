const express = require("express");
const router = express.Router();

const FormController = require("../controllers/FormController");

// GET
router.get("/:questionsId", FormController.getQuestions);

module.exports = router;
