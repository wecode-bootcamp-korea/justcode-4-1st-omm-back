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

const sendMasterCategory = async (id) => {
  return await prisma.$queryRaw`
  select JSON_ARRAYAGG(lc.name) as lesson_categories
  from lesson_categories lc, masters_categories mc
  where mc.master_id = ${id}
  and mc.lesson_category_id = lc.id
  group by mc.master_id
  `;
};

module.exports = { getCategory, sendLessonCat, sendMasterCategory };
