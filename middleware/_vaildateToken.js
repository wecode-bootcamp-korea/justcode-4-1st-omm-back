const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");
const MasterService = require("../services/MasterService");
const UserService = require("../services/UserService");
const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token || token === 'null') {

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

    const findMaster = await MasterService.getMasterByUserId(id);
    const findUser = await UserService.getUserByUserId(id);

    if (!findMaster && !findUser) {
      throw await errorGenerator({
        statusCode: 404,
        message: "USER_NOT_FOUND",
      });
    }
    req.master = findMaster;

    next();
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = validateToken;
