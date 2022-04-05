const AddressDao = require("../models/AddressDao");
// const errorGenerator = require("../utils/errorGenerator");

const getAddress = async () => {
  return await AddressDao.getAddress();
};

module.exports = { getAddress };
