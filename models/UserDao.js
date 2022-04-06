const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorGenerator = require("../utils/errorGenerator");

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
  console.log("getUserEmail");
  return await prisma.$queryRaw`
         select id from users where email=${email}
         `;
};
const createUser = async (name, email, encryptedPW) => {
  console.log("dao.createUser");
  const user = await prisma.users.create({
    data: {
      email: email,
      name: name,
      password: encryptedPW,
    },
  });
  return user;
};

module.exports = {
  createUserDirectMaster,
  sendLogIn,
  getUserByEmail,
  createUser,
};
