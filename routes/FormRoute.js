const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/userValidateToken");

const FormController = require("../controllers/FormController");

// GET
router.get("/questions/:lessonId/:userId",validateToken, FormController.getQuestions);
// POST
router.post("/questions/complete",validateToken, FormController.postQuestions);

module.exports = router;
