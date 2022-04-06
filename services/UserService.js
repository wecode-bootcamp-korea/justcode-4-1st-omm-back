const UserDao = require("../models/UserDao");
const bcrypt = require("bcrypt");
const errorGenerator = require("../utils/errorGenerator");
const jwt = require("jsonwebtoken");

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

const signup = async (name, email, password) => {
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

  if (!name || (!emailReg.test(email) && !pwReg.test(password))) {
    const error = new Error("Signup_Fail");
    error.statusCode = 400;
    throw error;
  }
  if (password.length < 8) {
    const error = new Error("PASSWORD_TOO_SHORT");
    error.statusCode = 400;
    throw error;
  }

  const user = await UserDao.getUserByEmail(email);

  if (user.length !== 0) {
    const error = new Error("EXISTING_USER");
    error.statusCode = 409;
    throw error;
  }

  const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const newUser = await UserDao.createUser(name, email, encryptedPW);

  return newUser;
};

module.exports = { sendLogIn, signup };
