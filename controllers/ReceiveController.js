const ReceiveService = require("../services/ReceiveService");
const errorGenerator = require("../utils/errorGenerator");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const { SECRET_KEY } = process.env;

const postReceive = async (req, res, next) =>{
  const { ended_at } = req.body;

  const deleteEstimate = await ReceiveService.setReceive(ended_at); 
  return res.status(200).json({ message: "SUCCESS", deleteEstimate });
}

const getReceive = async (req, res, next) => {
  try {
    const {userId} = req.params;

    const findUser = await UserService.getUserByUserId(Number(userId));
    const questions = await ReceiveService.getReceive(findUser.id);

    return res.status(200).json({ message: "SUCCESS", questions });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getReceive, postReceive };