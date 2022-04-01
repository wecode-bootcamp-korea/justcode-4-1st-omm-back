const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.$queryRaw`
    select 
      tc.id as id,
      tc.name as name,
      lc.id as lessonId,
      lc.name as lessonName,
      lc.image as lessonImage
    from 
      thema_categories tc
    join 
      lesson_categories lc
    on
      tc.id = lc.thema_category_id;
  `;
};

module.exports = { getCategory };
