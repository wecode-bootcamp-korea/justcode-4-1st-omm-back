const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const CategoryDao = require("../models/CategoryDao");
const AddressDao = require("../models/AddressDao");
const MasterDao = require("../models/MasterDao");

const sendMasters = async (search) => {
  return await MasterDao.getMasters(search);
};

const signUpDirect = async (
  name,
  email,
  password,
  phoneNumber,
  lessonCatID,
  address,
  detailAddress
) => {
  try {
    // 사용자 입력값 검증
    if (name.length < 2) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_NAME" });
    }

    const mailFormat =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!email.match(mailFormat)) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_EMAIL" });
    }

    const pwFormat = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    if (!password.match(pwFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PASSWORD",
      });
    }

    const phoneFormat = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    // 이메일과 번호로 일반 회원이나 고수로 이미 가입된 사용자인지 확인
    const userInfo = await MasterDao.findUserInfo(email, phoneNumber);
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

    const newUserInfo = await MasterDao.createUserDirectMaster(name, email, hashedPW, phoneNumber);
    const userId = newUserInfo.id;

    // 주소가 문자열로 들어왔으면 아이디로 변환
    if (typeof address === "string") {
      const masterAddress = await MasterDao.findMasterAddress(
        address,
        detailAddress
      );

      address = masterAddress.addressID[0].id
      detailAddress = masterAddress.detailAddressID[0].id
    }

    // 주소 id가 상세 주소 id와 매치되는지 확인
    const addId = await MasterDao.crossCheckAddress(detailAddress)
    if (addId[0].address_id !== address) {
      await MasterDao.rollBackSignUp(userId)
      throw await errorGenerator({ statusCode:400, message:"ADDRESS_NOT_MATCHED" })
    }

    // master 테이블에 추가
    const master = await MasterDao.createMaster(
      userId,
      name,
      address,
      detailAddress
    );

    await MasterDao.makeMasterMainCategories(master.id, lessonCatID);

    return master;
  } catch (error) {
    throw await error;
  }
};


const signUp = async (
  token,
  phoneNumber,
  lessonCatID,
  address,
  detailAddress
) => {
  try {
    // 사용자 입력값 검증
    const phoneFormat = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    // 로그인한 토큰을 가지고 유저가 맞는지 확인
    try {
      const isValidUser = jwt.verify(token, process.env.SECRET_KEY);
      
      await MasterDao.upgradeUserStatus(isValidUser.id, phoneNumber);
    } catch (error) {
      throw await errorGenerator({
        statusCode: 400,
        message: "INVALID_USER",
      });
    }

    
    // user ID 가져오기
    const validUser = jwt.verify(token, process.env.SECRET_KEY);
    const userId = validUser.id;
    
    // 주소가 문자열로 들어왔으면 아이디로 변환
    if (typeof address === "string") {
      const masterAddress = await MasterDao.findMasterAddress(
        address,
        detailAddress
      );
      address = masterAddress.addressID[0].id
      detailAddress = masterAddress.detailAddressID[0].id
    }

   
    // 주소 id가 상세 주소 id와 매치되는지 확인
    const addId = await MasterDao.crossCheckAddress(detailAddress)
    if (addId[0].address_id !== address) {
      await MasterDao.rollBackUserStatus(userId)
      throw await errorGenerator({ statusCode:400, message:"ADDRESS_NOT_MATCHED" })
    }

    // master 테이블에 추가
    const userInfo = await MasterDao.findUserName(userId)
    const master = await MasterDao.createMaster(
      userId,
      userInfo[0].name,
      address,
      detailAddress
    );

    
    await MasterDao.makeMasterMainCategories(master.id, lessonCatID);

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

const getMasterByUserId = async (userId) => {
  return await MasterDao.getMasterByUserId(userId);
};

const getMastersByCategory = async (category) => {
  return await MasterDao.getMastersByCategory(category);
};

const sendMasterDetail = async (id) => {
  const masterDetail = await MasterDao.sendMasterDetail(id);
  if (masterDetail.length === 0) {
    throw await errorGenerator({
      statusCode: 404,
      message: "존재하지 않는 사용자입니다.",
    });
  }

  const masterDetailAddress = await AddressDao.sendMasterAddress(id);
  const masterDetailCategory = await CategoryDao.sendMasterCategory(id);
  const masterDetailAll = masterDetail[0];
  masterDetailAll.lesson_categories = masterDetailCategory[0].lesson_categories;
  masterDetailAll.address = masterDetailAddress[0].address;
  masterDetailAll.detail_address = masterDetailAddress[0].detail_address;
  return masterDetailAll;
};


module.exports = {
  signUp,
  signUpDirect,
  sendMasters,
  getMasterProfile,
  setMasterProfile,
  getMasterByUserId,
  getMastersByCategory,
  sendMasterDetail,
};
