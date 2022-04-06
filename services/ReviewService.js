const ReviewDao = require("../models/ReviewDao");

const sendReviews = async (masterId) => {
  try {
    const reviews = await ReviewDao.sendReviews(masterId);
    return reviews;
  } catch (error) {
    throw await error;
  }
}

module.exports = { sendReviews };
