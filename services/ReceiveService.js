const ReceiveDao = require("../models/ReceiveDao");
const errorGenerator = require("../utils/errorGenerator");

const getReceive = async (userId) => {
  let objArrays = await ReceiveDao.getReceive(userId);
  for(let i=0; i<objArrays.length; i++){
    objArrays[i].goso_images = await ReceiveDao.getGosoList(objArrays[i].lesson_category_id);
  }
  return objArrays;
};

const setReceive = async (ended_at) =>{
  deleteRequest = await ReceiveDao.setReceive(ended_at);
  return deleteRequest;
}

module.exports = { getReceive, setReceive};