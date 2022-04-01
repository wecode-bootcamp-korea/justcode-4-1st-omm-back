const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getAdress = async () => {
  return await prisma.$queryRaw`
    select
      a.id as id,
      a.name as name,
      json_arrayagg(da.id) as detailId,
      json_arrayagg(da.name) as detailName
    from
      adress a
    join
      detail_adress da
    on
      a.id = da.adress_id
    group by
      a.id;
  `;
};

module.exports = { getAdress };
