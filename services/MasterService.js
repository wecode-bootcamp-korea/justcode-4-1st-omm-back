const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const masterDao = require("../models/MasterDao");
const userDao = require("../models/UserDao");

const sendMasters = async () => {
  try {
    return await masterDao.getMasters();
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  userID,
  lessonCatID,
  adress,
  detailAdress
) => {
  try {
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

    const phoneFormat = /^([0-9+]{3})-([0-9+]{3,4})-([0-9+]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    const hashedPW = bc.hashSync(password, bc.genSaltSync());

    switch (true) {
      case userID === "":
        const user = await userDao.createUserDirectMaster(
          name,
          email,
          hashedPW,
          phoneNumber
        );

      default:
        const master = await masterDao.createMaster(
          userID === "" ? user.id : userID
        );

        await masterDao.insertMasterCat(master.id, lessonCatID);

        const masterAddress = await masterDao.findMasterAddress(
          adress,
          detailAdress
        );

        await masterDao.insertMasterAddress(
          master.id,
          masterAddress.adressID[0].id,
          masterAddress.detailAdressID[0].id
        );

        return master;
    }
  } catch (error) {
    throw await error;
  }
};

module.exports = { signUp, sendMasters };
