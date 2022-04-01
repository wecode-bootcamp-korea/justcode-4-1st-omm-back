const UserDao = require("../models/UserDao");
const errorGenerator = require("../utils/errorGenerator");

const getAdress = async () => {
  return await UserDao.getAdress();
};

module.exports = { getAdress };
