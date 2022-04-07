const MasterService = require("../services/MasterService");
const errorGenerator = require("../utils/errorGenerator");

const sendMasters = async (req, res) => {
  try {
    const search = await MasterService.sendMasters();
    return res.status(200).json(search);
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { Authorization } = req.headers;

    const {
      name,
      email,
      password,
      phoneNumber,
      lessonCatID,
      address,
      detailAddress,
    } = req.body;

    if (typeof Authorization === "undefined") {
      if (
        !name ||
        typeof name !== "string" ||
        !email ||
        typeof email !== "string" ||
        !password ||
        typeof password !== "string" ||
        !phoneNumber ||
        !lessonCatID ||
        typeof lessonCatID !== "object" ||
        !address ||
        !detailAddress
      ) {
        throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
      }
    } else {
      if (
        typeof password !== "string" ||
        !phoneNumber ||
        !lessonCatID ||
        typeof lessonCatID !== "object" ||
        !address ||
        !detailAddress
      ) {
        throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
      }
    }

    const newMaster = await MasterService.signUp(
      name,
      email,
      password,
      phoneNumber,
      Authorization,
      lessonCatID,
      address,
      detailAddress
    );

    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
      masterID: newMaster.id,
      userID: newMaster.user_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMasterProfile = async (req, res, next) => {
  try {
    const { id } = req.master;
    const master = await MasterService.getMasterProfile(Number(id));
    return res.status(201).json({
      message: "SUCCESS",
      master,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const setMasterProfile = async (req, res, next) => {
  try {
    const { type, value, user } = req.body;
    // const { user } = req;
    if (!type || !value || !user) {
      throw await errorGenerator({
        statusCode: 400,
        message: "KEY_ERROR",
      });
    }
    await MasterService.setMasterProfile({ type, value, user });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { sendMasters, signUp, getMasterProfile, setMasterProfile };
