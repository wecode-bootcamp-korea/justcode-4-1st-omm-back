const UserDao = require("../models/UserDao");
const bcrypt = require("bcrypt");
const errorGenerator = require("../utils/errorGenerator");

const signup = async (name, email, password) => {
  try {
    //정해진 형식 따라가는지 확인
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

    if (!name || !emailReg.test(email) || !pwReg.test(email)) {
      const error = new Error("Signup_Fail");
      error.statusCode = 400;
      throw error;
    }
    if (password.length < 8) {
      const error = new Error("PASSWORD_TOO_SHORT");
      error.statusCode = 400;
      throw error;
    }

    //중복 회원가입 확인
    const user = await UserDao.getUserByEmail(email);

    if (user.length !== 0) {
      const error = new Error("EXISTING_USER");
      error.statusCode = 409;
      throw error;
    }

    //비밀번호 암호화
    const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync());

    const newUser = await UserDao.createUser(name, email, encryptedPW);

    return newUser;
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAddress = async () => {
  return await UserDao.getAddress();
};

module.exports = { getAddress, signup };
