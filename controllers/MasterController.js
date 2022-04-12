const MasterService = require("../services/MasterService");
const errorGenerator = require("../utils/errorGenerator");


const sendMasters = async (req, res) => {
  try {
    const search = req.query;
    const masters = await MasterService.sendMasters(search);
    return res.status(200).json(masters);
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUpDirect = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      lessonCatID,
      address,
      detailAddress,
    } = req.body;

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
      !detailAddress ||
      typeof address !== typeof detailAddress
    ) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    
    await MasterService.signUpDirect(
      name,
      email,
      password,
      phoneNumber,
      lessonCatID,
      address,
      detailAddress
    );

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { token } = req.headers;

    const {
      phoneNumber,
      lessonCatID,
      address,
      detailAddress
    } = req.body;

    if (!token) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    if (
      !phoneNumber ||
      !lessonCatID ||
      typeof lessonCatID !== "object" ||
      !address ||
      !detailAddress
    ) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    await MasterService.signUp(
      token,
      phoneNumber,
      lessonCatID,
      address,
      detailAddress
    );

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
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

const getMastersByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const getMasters = await MasterService.getMastersByCategory(category);

    return res.status(200).json({ message: "SUCCESS", getMasters });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const sendMasterDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const masterDetail = await MasterService.sendMasterDetail(id);
    return res.status(200).json(masterDetail);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  sendMasters,
  signUp,
  signUpDirect,
  getMasterProfile,
  setMasterProfile,
  getMastersByCategory,
  sendMasterDetail,
};
