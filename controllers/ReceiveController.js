const ReceiveService = require("../services/ReceiveService");
const errorGenerator = require("../utils/errorGenerator");

const getReceive = async (req, res, next) => {
  try {
    const questions = await ReceiveService.getReceive();

    return res.status(200).json({ message: "SUCCESS", questions });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getReceive };