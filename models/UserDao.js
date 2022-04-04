const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = { getAddress, getUserByEmail, createUser };
