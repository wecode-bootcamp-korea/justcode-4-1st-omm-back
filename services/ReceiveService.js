const ReceiveDao = require("../models/ReceiveDao");
const errorGenerator = require("../utils/errorGenerator");

const getReceive = async () => {
  let objArrays = await ReceiveDao.getReceive();
  for(let i=0; i<objArrays.length; i++){
    objArrays[i].goso_images = await ReceiveDao.getGosoList(objArrays[i].lesson_category_id);
  }
  console.log(objArrays);
  return objArrays;
};

module.exports = { getReceive};