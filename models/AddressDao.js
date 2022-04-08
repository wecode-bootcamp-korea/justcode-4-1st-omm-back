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
  from address a, detail_address d, masters m 
  where m.id = ${id}
  and m.address_id = a.id
  and m.detail_address_id = d.id;
  `;
};

module.exports = {
  getAddress,
  sendMasterAddress,
};
