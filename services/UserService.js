const UserDao = require("../models/UserDao");
const errorGenerator = require("../utils/errorGenerator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAddress = async () => {
  return await UserDao.getAddress();
};

const sendLogIn = async (email, password) => {
  const userDB = await UserDao.sendLogIn(email);

  if (userDB.length === 0) {
    throw errorGenerator({
      statusCode: 404,
      message: "존재하지 않는 사용자입니다.",
    });
  }

  if (!(await bcrypt.compare(password, userDB[0].password))) {
    throw new errorGenerator({
      statusCode: 400,
      message: "잘못된 아이디 혹은 비밀번호입니다.",
    });
  }
  const token = jwt.sign(
    { id: userDB[0].id, expired_in: "1hr" },
    process.env.SECRET_KEY
  );

  return token;
};

module.exports = { getAddress, sendLogIn };
