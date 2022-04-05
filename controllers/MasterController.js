const masterService = require("../services/MasterService");
const errorGenerator = require("../utils/errorGenerator");

const signUp = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      userID,
      lessonCatID,
      adress,
      detailAdress,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !lessonCatID ||
      !adress ||
      !detailAdress
    ) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    const newMaster = await masterService.signUp(
      name,
      email,
      password,
      phoneNumber,
      userID,
      lessonCatID,
      adress,
      detailAdress
    );

    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
      masterID: newMaster.id,
      userID: newMaster.user_id,
    });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { signUp };
