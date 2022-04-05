const masterService = require("../services/MasterService");
const errorGenerator = require("../utils/errorGenerator");

const sendMasters = async (req, res) => {
  try {
    const search = await masterService.sendMasters();
    return res.status(200).json(search);
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};
const sendCategories = async (req, res, next) => {
  try {
    const category = req.params.category;

    const lessonCat = await masterService.sendLessonCat(category);
    return res.status(200).json(lessonCat);
  } catch (error) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

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

module.exports = { sendCategories, signUp, sendMasters };
