const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const errorGenerator = require("../utils/errorGenerator");

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

module.exports = {
  getAddress,
};
