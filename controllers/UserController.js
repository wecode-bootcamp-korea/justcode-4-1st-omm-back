const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

const getAddress = async (req, res, next) => {
  try {
    const address = await UserService.getAddress();
    return res.status(200).json({ message: "SUCCESS", address });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const sendLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.sendLogIn(email, password);
    return res.status(200).json({ access_token: token });
  } catch (err) {
    return res.status(statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getAddress, sendLogIn };
