const errorGenerator = require("../utils/errorGenerator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const findUserInfo = async (inputEmail, inputPhone) => {
    try {
        const userInfo = await prisma.$queryRaw`
            SELECT id, name, email, user_image AS userImg, phone_number AS phoneNumber, is_deleted AS isDeleted 
            FROM users
            WHERE users.email = ${inputEmail} 
            OR users.phone_number = ${inputPhone};
        `
        console.log(userInfo)
        return userInfo
    } catch (error) {
        console.log(error);
        throw await errorGenerator({ statusCode:500, message: error.message });
    }
}

const createUserDirectMaster = async (inputName, inputEmail, inputPW, inputPhone) => {
    try {
        const user = await prisma.users.create({
            data: {
                name: inputName,
                email: inputEmail,
                password: inputPW,
                phone_number: inputPhone
            }
          });
        return user;
    } catch (error) {
        console.log(error);
        throw await errorGenerator({ statusCode:500, message: "SERVER_ERROR" });
    }
}

module.exports = { findUserInfo, createUserDirectMaster };
