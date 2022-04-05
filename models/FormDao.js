const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getQuestions = async (lessonId) => {
  return await prisma.questions.findMany({
    where: {
      lesson_category_id: Number(lessonId),
    },
    select: {
      id: true,
      description: true,
      question_number: true,
      choices: {
        select: {
          id: true,
          description: true,
        },
      },
    },
  });
};

module.exports = { getQuestions };
