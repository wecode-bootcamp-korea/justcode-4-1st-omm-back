const express = require("express");
const router = express.Router();

const FormController = require("../controllers/FormController");

// GET
router.get("/questions/:lessonId", FormController.getQuestions);

module.exports = router;
