const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.themaCategories.findMany({
    select: {
      id: true,
      name: true,
      LessonCategories: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

module.exports = { getCategory };
