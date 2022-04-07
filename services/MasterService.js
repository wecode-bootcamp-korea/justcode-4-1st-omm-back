const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const MasterDao = require("../models/MasterDao");
const UserDao = require("../models/UserDao");

const sendMasters = async () => {
  try {
    return await MasterDao.getMasters();
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  token,
  lessonCatID,
  address,
  detailAddress
) => {
  try {
    // 사용자 입력값 검증
    if (name.length < 2) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_NAME" });
    }

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat)) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_EMAIL" });
    }

    const pwFormat = /^[A-Za-z0-9+]{8,50}$/;
    if (!password.match(pwFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PASSWORD",
      });
    }

    const phoneFormat = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    if (typeof token === "undefined") {
      // 이메일과 번호로 가입된 사용자인지 확인
      const userInfo = await UserDao.findUserInfo(email, phoneNumber);

      // 로그인을 하지 않았지만, 일반 회원이나 고수로 이미 가입한 사용자인지 확인
      if (userInfo.length !== 0) {
        const isExistingMaster = await MasterDao.findMasterInfo(userInfo[0].id);
        if (isExistingMaster.length !== 0) {
          throw await errorGenerator({
            statusCode: 400,
            message: "EXISTING_MASTER",
          });
        } else {
          throw await errorGenerator({
            statusCode: 400,
            message: "EXISTING_USER!_PLEASE_LOGIN",
          });
        }
      }

      // 일반 회원으로 가입한 적이 없고 고수로 가입 신청한 경우, user 테이블에 추가
      const hashedPW = bc.hashSync(password, bc.genSaltSync());

      await UserDao.createUserDirectMaster(name, email, hashedPW, phoneNumber);
    } else {
      // 로그인한 토큰을 가지고 유저가 맞는지 확인
      try {
        const isValidUser = jwt.verify(token, process.env.SECRET_KEY);
        await UserDao.insertPhoneNum(isValidUser.id, phoneNumber);
      } catch (error) {
        throw await errorGenerator({
          statusCode: 400,
          message: "INVALID_USER",
        });
      }
    }

    // user ID 가져오기
    const userInfo = await UserDao.getUserByEmail(email);
    const userID = userInfo[0].id;

    // master 테이블에 추가
    const master = await MasterDao.createMaster(userID, name);

    await MasterDao.insertMasterCat(master.id, lessonCatID);

    const masterAddress = await MasterDao.findMasterAddress(
      address,
      detailAddress
    );

    await MasterDao.insertMasterAddress(
      master.id,
      masterAddress.addressID[0].id,
      masterAddress.detailAddressID[0].id
    );

    return master;
  } catch (error) {
    throw await error;
  }
};

const getMasterProfile = async (masterId) => {
  return await MasterDao.getMasterProfile(masterId);
};

const setMasterProfile = async (params) => {
  return await MasterDao.setMasterProfile(params);
};
module.exports = {
  signUp,
  sendMasters,
  getMasterProfile,
  setMasterProfile,
};
