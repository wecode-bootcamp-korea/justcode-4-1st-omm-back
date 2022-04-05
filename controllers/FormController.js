const FormService = require("../services/FormService");
const errorGenerator = require("../utils/errorGenerator");

const getQuestions = async (req, res, next) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const questions = await FormService.getQuestionsByLessonId(lessonId);

    return res.status(200).json({ message: "SUCCESS", questions });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getQuestions };
