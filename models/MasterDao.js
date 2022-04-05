const errorGenerator = require("../utils/errorGenerator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createMaster = async (userID) => {
  try {
    const master = await prisma.masters.create({
      data: {
        user_id: Number(userID),
      },
    });
    return master;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

const insertMasterCat = async (masterID, lessonCatID) => {
  try {
    lessonCatID.map(async (catID) => {
      await prisma.$queryRaw`
            INSERT INTO masters_categories (master_id, lesson_category_id, is_main)
            VALUES
            (${masterID}, ${catID}, false);
        `;
    });
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

const findMasterAddress = async (adress, detailAdress) => {
  try {
    const adressID = await prisma.$queryRaw`
            SELECT id FROM adress
            WHERE name = ${adress};
        `;

    const detailAdressID = await prisma.$queryRaw`
            SELECT id FROM detail_adress
            WHERE name = ${detailAdress};
        `;

    return { adressID, detailAdressID };
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

const insertMasterAddress = async (masterID, adressID, detailAdressID) => {
  try {
    await prisma.$queryRaw`
            INSERT INTO masters_adress (master_id, adress_id, detail_adress_id)
            VALUES
            (${masterID}, ${adressID}, ${detailAdressID});
        `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

module.exports = {
  createMaster,
  insertMasterCat,
  findMasterAddress,
  insertMasterAddress,
};
