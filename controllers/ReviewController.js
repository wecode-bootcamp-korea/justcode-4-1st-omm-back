const ReviewService = require("../services/ReviewService");

const getReviews = async (req, res) => {
  try {
    const { masterId, limit } = req.query;
    const reviews = await ReviewService.getReviews(masterId, limit);

    return res.status(200).json({ message: "SUCCESS", reviews: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeReview = async (req, res) => {
  try {
    const { masterid, userid } = req.headers;
    const { review } = req.body;

    const reviews = await ReviewService.makeReview(masterid, userid, review)
    return res.status(200).json({ message: "SUCCESS", reviews: reviews})

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getReviews, makeReview };