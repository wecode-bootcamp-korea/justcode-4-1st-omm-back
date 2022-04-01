const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.$queryRaw`
    select 
      tc.id as id,
      tc.name as name,
      json_arrayagg(lc.id) as lessonId,
      json_arrayagg(lc.name) as lessonName,
      json_arrayagg(lc.image) as lessonImage
    from 
      thema_categories tc
    join 
      lesson_categories lc
    on
      tc.id = lc.thema_category_id
    group by
      tc.id
  `;
};

module.exports = { getCategory };
