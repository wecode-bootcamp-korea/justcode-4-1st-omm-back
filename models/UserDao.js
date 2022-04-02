const errorGenerator = require("../utils/errorGenerator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
        throw await errorGenerator({ statusCode:500, message: error.message });
    }
}

module.exports = { createUserDirectMaster };
