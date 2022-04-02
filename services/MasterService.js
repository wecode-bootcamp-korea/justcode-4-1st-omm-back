const masterDao = require("../models/MasterDao");
const userDao = require("../models/UserDao");
const errorGenerator = require("../utils/errorGenerator");

const sendLessonCat = async (category) => {
    let categoryKo
    switch (category) {
        case 'lesson':
            categoryKo = "레슨"
            break
        case 'home':
            categoryKo = "홈/리빙"
            break
        case 'event':
            categoryKo = "이벤트"
            break
        case 'business':
            categoryKo = "비즈니스"
            break
        case 'design_develop':
            categoryKo = "디자인/개발"
            break
        case 'health':
            categoryKo = "건강/미용"
            break
        case 'part_time':
            categoryKo = "알바"
            break
        case 'etc':
            categoryKo = "기타"
            break
    }
  const lessonCat = await masterDao.sendLessonCat(categoryKo);
  return lessonCat;
};

const signUp = async (name, email, password, phoneNumber, userID, lessonCatID, adress, detailAdress) => {
  
  try {
    if (password.length < 8) {
        throw await errorGenerator({ statusCode: 400, message: "WRONG_PASSWORD" });
    }

    switch (true) {
        case (userID === ""):
            const user = await userDao.createUser(name, email, password, phoneNumber);
    
        default:

            const master = await masterDao.createMaster(userID === ""? user.id : userID);

            await masterDao.insertMasterCat(master.id, lessonCatID);

            const masterAddress = await masterDao.findMasterAddress(adress, detailAdress);

            await masterDao.insertMasterAddress(master.id, masterAddress.adressID[0].id, masterAddress.detailAdressID[0].id);

            break;
    }

  } catch (error) {
    console.log(error)
    //   throw await errorGenerator({ statusCode: 500, message: "WRONG_INPUT" })
    throw error
  }
    
};

module.exports = { sendLessonCat, signUp }