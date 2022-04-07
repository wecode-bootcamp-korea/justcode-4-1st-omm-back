const FormDao = require("../models/FormDao");
const errorGenerator = require("../utils/errorGenerator");

const getQuestions = async (lessonId) => {
  return await FormDao.getQuestions(lessonId);
};

const getLessonCategoryId = async (lessonId) =>{
  return await FormDao.getLessonCategoryId(lessonId);
}

const postQuestions = async (questionForm) =>{
  for(let i=0; i< questionForm.length; i++){
    await FormDao.postQuestion(questionForm[i]);
  }
}

module.exports = { getQuestions, postQuestions, getLessonCategoryId };
