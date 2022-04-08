const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const errorGenerator = require("../utils/errorGenerator");

const getAddress = async () => {
  return await prisma.address.findMany({
    select: {
      id: true,
      name: true,
      detailAddress: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const sendMasterAddress = async (id) => {
  return await prisma.$queryRaw`
  select a.name as address, d.name as detail_address
  from address a, detail_address d, masters_address ma 
  where ma.master_id = ${id}
  and ma.address_id = a.id
  and ma.detail_address_id = d.id
  `;
};

module.exports = {
  getAddress,
  sendMasterAddress,
};
