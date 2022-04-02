const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  try {
    return await prisma.$queryRaw`
      SELECT
        tc.id,
        tc.name as name,
        lc.id as lessonId,
        lc.name as lessonName,
        lc.image as lessonImage
      FROM
        thema_categories tc
      JOIN 
        lesson_categories lc
      ON
        tc.id = lc.thema_category_id;
      `
  } catch (error) {
    console.log(error);
    throw await errorGenerator({ statusCode:500, message: error.message });    
  }
  
};

module.exports = { getCategory };
