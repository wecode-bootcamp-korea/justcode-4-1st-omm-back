const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendLogIn = async (email) => {
  return await prisma.$queryRaw`
  select id,email,password from users 
  where email=${email}
  `;
};

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    select id, password from users where email= ${email};`;
};

const createUser = async (name, email, encryptedPW) => {
  return await prisma.users.create({
    data: {
      email: email,
      name: name,
      password: encryptedPW,
    },
  });
};

const getUserByUserId = async (userId) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
};

module.exports = {
  sendLogIn,
  getUserByEmail,
  createUser,
  getUserByUserId,
};
