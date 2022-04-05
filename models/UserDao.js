const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorGenerator = require("../utils/errorGenerator");

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

const getAddress = async () => {
  return await prisma.address.findMany({
    select: {
      id: true,
      name: true,
      details: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const createUserDirectMaster = async (
  inputName,
  inputEmail,
  inputPW,
  inputPhone
) => {
  try {
    const user = await prisma.users.create({
      data: {
        name: inputName,
        email: inputEmail,
        password: inputPW,
        phone_number: inputPhone,
      },
    });
    return user;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: error.message });
  }
};

const sendLogIn = async (email) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
};

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
         select (id,password) from users where email=${email}}`;
};
const createUser = async (name, email, encryptedPW) => {
  return await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: encryptedPW,
    },
  });
};

module.exports = {
  createUserDirectMaster,
  sendLogIn,
  getUserByEmail,
  createUser,
};
