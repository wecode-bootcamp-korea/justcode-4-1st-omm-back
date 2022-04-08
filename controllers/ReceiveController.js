const ReceiveService = require("../services/ReceiveService");
const errorGenerator = require("../utils/errorGenerator");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const { SECRET_KEY } = process.env;

const getReceive = async (req, res, next) => {
  try {
    console.log("ddddddd");
    const { token } = req.headers;
    if (!token || token === 'null' || token === undefined) {
      throw await errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    if (!id) {
      throw await errorGenerator({
        statusCode: 400,
        message: "INCORRECT_TOKEN",
      });
    }

    const findUser = await UserService.getUserByUserId(id);
    const questions = await ReceiveService.getReceive(findUser.id);
    console.log("finsih");
    return res.status(200).json({ message: "SUCCESS", questions });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getReceive };