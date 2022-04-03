const userService = require("../services/UserService");

const sendLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.sendLogIn(email, password);
    return res.status(200).json({ access_token: token });
  } catch (err) {
    return res.status(statusCode || 500).json({ message: err.message });
  }
};

module.exports = { sendLogIn };
