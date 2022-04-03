const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorGenerator = require("../utils/errorGenerator");

const masterDao = require("../models/MasterDao");
const userDao = require("../models/UserDao");


const sendLessonCat = async (category) => {
    try {
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
    } catch (error) {
        throw await error
    }

};

const signUp = async (name, email, password, phoneNumber, userID, lessonCatID, adress, detailAdress) => {
    try {
        // 사용자 입력값 검증
        if (name.length < 2) {
            throw await errorGenerator({ statusCode:400, message: "WRONG_NAME"})
        }

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailFormat)) {
            throw await errorGenerator({ statusCode:400, message: "WRONG_EMAIL" })
        }

        const pwFormat = /^[A-Za-z0-9+]{8,50}$/; 
        if (!password.match(pwFormat)) {
            throw await errorGenerator({ statusCode: 400, message: "WRONG_PASSWORD" });
        }

        const phoneFormat = /^([0-9+]{3})-([0-9+]{3,4})-([0-9+]{4})$/;
        if (!phoneNumber.match(phoneFormat)) {
            throw await errorGenerator({ statusCode:400, message: "WRONG_PHONE_NUMBER" })
        };

        // sql injection 대응
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !name.match(re) || !email.match(re) || !phoneNumber.match(re)) {
            throw await errorGenerator({ statusCode:400, message: "WRONG_INPUT" })
        }

        // 가입된 사용자인지 확인
        const userInfo = await userDao.findUserInfo(email, phoneNumber)

        if (userInfo.length !== 0) {
            throw await errorGenerator({ statusCode:400, message: "EXISTING_USER" })
        }

        // 사용자 비밀번호 암호화
        const hashedPW = bc.hashSync(password,bc.genSaltSync())        

        // 일반 회원이 아니면서 고수로 바로 가입하려면 일반 회원으로 먼저 가입시킵니다.
        // userID 값을 DB에서 가져와야 함..
        if (userID === "") {
            await userDao.createUserDirectMaster(name, email, hashedPW, phoneNumber);
        }

        const master = await masterDao.createMaster(userID === ""? userInfo.id : userID);

        await masterDao.insertMasterCat(master.id, lessonCatID);

        const masterAddress = await masterDao.findMasterAddress(adress, detailAdress);

        await masterDao.insertMasterAddress(master.id, masterAddress.adressID[0].id, masterAddress.detailAdressID[0].id);

        return master
    } catch (error) {
        throw await error
    }
};

module.exports = { sendLessonCat, signUp }
