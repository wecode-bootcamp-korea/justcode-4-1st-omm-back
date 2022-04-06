const ReviewDao = require("../models/ReviewDao");
const MasterDao = require("../models/MasterDao");
const errorGenerator = require("../utils/errorGenerator");


const sendPreview = async (masterId) => {
  try {
    // masterId가 master테이블에 있는지 확인
    const isMaster = await MasterDao.isMaster(masterId);
    if (isMaster.length === 0) {
      throw await errorGenerator({ statusCode:400, message: "MASTER_DOES_NOT_EXIST" })
    }

    const reviews = await ReviewDao.sendPreview(masterId);

    return reviews;
  } catch (error) {
    throw await error;
  }
}

const sendReviews = async (masterId) => {
  try {
    // masterId가 master테이블에 있는지 확인
    const isMaster = await MasterDao.isMaster(masterId);
    if (isMaster.length === 0) {
      throw await errorGenerator({ statusCode:400, message: "MASTER_DOES_NOT_EXIST" })
    }

    const reviews = await ReviewDao.sendReviews(masterId);

    return reviews;
  } catch (error) {
    throw await error;
  }
}

module.exports = { sendPreview, sendReviews };
