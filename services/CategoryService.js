const CategoryDao = require("../models/CategoryDao");
const ReviewDao = require("../models/ReviewDao");
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

const sendMasters = async (id) => {
  try {
    const catMasters = await CategoryDao.sendMasters(id);
    const masters = await Promise.all(catMasters.map(async (item) => { 
      item.reviews = await ReviewDao.sendPreview(item.id)
      return await item
    }))

    return masters;
  } catch (error) {
    throw await error;
  }
}

module.exports = { getCategory, sendLessonCat, sendMasters };
