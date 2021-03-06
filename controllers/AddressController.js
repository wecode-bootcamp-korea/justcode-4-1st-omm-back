const AddressService = require("../services/AddressService");
// const errorGenerator = require("../utils/errorGenerator");

const getAddress = async (req, res, next) => {
  try {
    const address = await AddressService.getAddress();
    return res.status(200).json({ message: "SUCCESS", address });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getAddress };
