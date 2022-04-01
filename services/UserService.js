const UserDao = require("../models/UserDao");
const bcrypt = require("bcrypt");

const signup = async () => {
  try {
    //정규식
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

    if (!emailReg || !pwReg) {
      const error = new Error("signup fail");
      error.statusCode = 400;
      throw error;
    }

    //비밀번호 암호화

    //
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
