const express = require("express");
const router = express.Router();

const FormController = require("../controllers/FormController");

// GET
router.get("/questions/:lessonId", FormController.getQuestions);
// POST
router.post("/questions/complete", FormController.postQuestions);

module.exports = router;
