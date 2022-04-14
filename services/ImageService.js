const ImageDao = require("../models/ImageDao");

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  return await ImageDao.uploadReviewImage(reviewId, reviewImageAddr);
};

module.exports = { uploadReviewImage };