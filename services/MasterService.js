const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const masterDao = require("../models/MasterDao");
const userDao = require("../models/UserDao");

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  userID,
  lessonCatID,
  address,
  detailAddress
) => {
  try {
    // 사용자 입력값 검증
    if (name.length < 2) {
        throw await errorGenerator({ statusCode:400, message: "WRONG_NAME"})
    }

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat)) {
        throw await errorGenerator({ statusCode:400, message: "WRONG_EMAIL" })
    }

    const pwFormat = /^[A-Za-z0-9+]{8,50}$/;
    if (!password.match(pwFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PASSWORD",
      });
    }

    // // sql injection 대응
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if ( !name.match(re) || !email.match(re) || !phoneNumber.match(re)) {
    //     throw await errorGenerator({ statusCode:400, message: "WRONG_INPUT" })
    // }

    // 가입된 사용자인지 확인
    const userInfo = await userDao.findUserInfo(email, phoneNumber)

    if (userInfo.length !== 0) {
        throw await errorGenerator({ statusCode:400, message: "EXISTING_USER" })
    }

    // 사용자 비밀번호 암호화
    const hashedPW = bc.hashSync(password,bc.genSaltSync())        

    // 일반 회원이 아니면서 고수로 바로 가입하려면 일반 회원으로 먼저 가입시킵니다.
    // userID 값을 DB에서 가져와야 함..
    if (userID === "") {
        await userDao.createUserDirectMaster(name, email, hashedPW, phoneNumber);
    }

    const master = await masterDao.createMaster(userID === ""? userInfo.id : userID);

    await masterDao.insertMasterCat(master.id, lessonCatID);

    const masterAddress = await masterDao.findMasterAddress(adress, detailAdress);

    await masterDao.insertMasterAddress(master.id, masterAddress.adressID[0].id, masterAddress.detailAdressID[0].id);

    return master
  } catch (error) {
      throw await error
  }
};

module.exports = { signUp };
