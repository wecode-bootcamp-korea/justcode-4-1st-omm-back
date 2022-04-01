const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

const getAdress = async (req, res, next) => {
  try {
    const adress = await UserService.getAdress();

    return res.status(200).json({ message: "SUCCESS", adress });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getAdress };
