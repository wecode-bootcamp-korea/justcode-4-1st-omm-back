const errorGenerator = require("../utils/errorGenerator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMasters = async () => {
  try {
    const search = await prisma.users.findMany({
      select: {
        id: true,
        user_image: true,
        masters: {
          select: {
            id: true,
            name: true,
            intro: true,
            work_experience: true,
            reviews: {
              select: {
                id: true,
                comment: true,
                grade: true,
              },
            },
          },
        },
      },
    });

    return search;
  } catch (err) {}
};

const sendLessonCat = async (category) => {
  try {
    const lessonCat = await prisma.$queryRaw`
        SELECT lc.id, lc.name 
        FROM lesson_categories lc
        JOIN thema_categories tc
        ON lc.thema_category_id = tc.id
        WHERE tc.name = ${category};
        `;
    return lessonCat;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

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
  getMasters,
  sendLessonCat,
  createMaster,
  insertMasterCat,
  findMasterAddress,
  insertMasterAddress,
};
