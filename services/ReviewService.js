const ReviewDao = require("../models/ReviewDao");

const getReviews = async (masterId, limit) => {
  try {
    return await ReviewDao.getReviews(masterId, limit);
  } catch (error) {
    throw await error;
  }
}

const makeReview = async (masterId, userId, review) => {
  try {
    return await ReviewDao.makeReview(masterId, userId, review);
  } catch (error) {
    throw await error;
  }
}

module.exports = { getReviews, makeReview };
