const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAdress = async () => {
  return await prisma.adress.findMany({
    select: {
      id: true,
      name: true,
      DetailAdress: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

module.exports = { getAdress };
