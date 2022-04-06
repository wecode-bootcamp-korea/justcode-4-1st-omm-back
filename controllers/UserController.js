const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

const sendLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.sendLogIn(email, password);
    return res.status(200).json({ access_token: token });
  } catch (err) {
    return res.status(statusCode || 500).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  try {
    console.log(1);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Key_Error");
      error.statusCode = 400;
      throw error;
    }

    const user = await UserService.signup(name, email, password);
    console.log(6);
    return res.status(201).json({
      message: "Created",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { sendLogIn, signup };
