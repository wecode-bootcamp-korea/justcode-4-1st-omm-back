const FormDao = require("../models/FormDao");
const errorGenerator = require("../utils/errorGenerator");

const getQuestions = async (lessonId) => {
  return await FormDao.getQuestions(lessonId);
};

module.exports = { getQuestions };
