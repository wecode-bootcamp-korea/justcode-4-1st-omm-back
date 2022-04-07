const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");
const UserService = require("../services/UsersService");
const { SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw await errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }

    const { user } = jwt.verify(token, SECRET_KEY);

    if (!user.id) {
      throw await errorGenerator({
        statusCode: 400,
        message: "INCORRECT_TOKEN",
      });
    }

    // const foundUser = await UserService.getUserById(user.id);

    // if (foundUser.length !== 0) {
    //   throw await errorGenerator({
    //     statusCode: 404,
    //     message: "USER_NOT_FOUND",
    //   });
    // }

    // req.foundUser = foundUser;

    req.user = user;

    next();
  } catch (err) {
    console.log("middleware vaildateToken err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = validateToken;
