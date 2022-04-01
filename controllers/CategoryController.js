const CategoryService = require("../services/CategoryService");
const errorGenerator = require("../utils/errorGenerator");

const getCategory = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategory();

    return res.status(200).json({ message: "SUCCESS", categories });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getCategory };
