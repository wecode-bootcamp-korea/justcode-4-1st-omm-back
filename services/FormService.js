const FormDao = require("../models/FormDao");
const errorGenerator = require("../utils/errorGenerator");

const getQuestionsByLessonId = async (lessonId) => {
  return await FormDao.getQuestionsByLessonId(lessonId);
};

module.exports = { getQuestionsByLessonId };
