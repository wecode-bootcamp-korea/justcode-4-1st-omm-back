const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.themaCategories.findMany({
    select: {
      id: true,
      name: true,
      lessons: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

const sendLessonCat = async (id) => {
  try {
    return await prisma.$queryRaw`
        SELECT lc.id, lc.name 
        FROM lesson_categories lc
        JOIN thema_categories tc
        ON lc.thema_category_id = tc.id
        WHERE tc.id = ${id};
        `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

const sendMasters = async (id) => {
  try {
    return await prisma.$queryRaw`
      SELECT m.id, name, work_experience AS workExp
      FROM masters m
      JOIN masters_categories mc
      ON mc.master_id = m.id
      WHERE mc.lesson_category_id = ${id}
      AND m.is_deleted = false
      GROUP BY m.id;
    `
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
}

module.exports = { getCategory, sendLessonCat, sendMasters };
