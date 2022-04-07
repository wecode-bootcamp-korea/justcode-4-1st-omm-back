const CategoryDao = require("../models/CategoryDao");
const errorGenerator = require("../utils/errorGenerator");

const getCategory = async () => {
  return await CategoryDao.getCategory();
};

const sendLessonCat = async (id) => {
  try {
    return await CategoryDao.sendLessonCat(id);
  } catch (error) {
    throw await error;
  }
};

module.exports = { getCategory, sendLessonCat };
