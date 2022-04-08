const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.themaCategories.findMany({
    select: {
      id: true,
      name: true,
      lessonCategories: {
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

module.exports = { getCategory, sendLessonCat };
