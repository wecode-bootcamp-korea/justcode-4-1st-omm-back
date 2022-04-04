const UserService = require("../services/UserService");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Key_Error");
      error.statusCode = 400;
      throw error;
    }

    const user = await UserService.signup(name, email, password);

    return res.status(201).json({
      message: "Created",
      user_id: user.id,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signup };
