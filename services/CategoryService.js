const CategoryDao = require("../models/CategoryDao");
const errorGenerator = require("../utils/errorGenerator");

const getCategory = async () => {
  return await CategoryDao.getCategory();
};

module.exports = { getCategory };
