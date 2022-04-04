const UserDao = require("../models/UserDao");
const errorGenerator = require("../utils/errorGenerator");

const getAddress = async () => {
  return await UserDao.getAddress();
};

module.exports = { getAddress };
