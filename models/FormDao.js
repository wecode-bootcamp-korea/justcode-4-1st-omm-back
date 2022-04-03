const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getQuestionsByLessonId = async (lessonId) => {
  return await prisma.questions.findMany({
    where: {
      lesson_category_id: lessonId,
    },
    select: {
      id: true,
      description: true,
      question_number: true,
      ChoiceQuestions: {
        select: {
          id: true,
          description: true,
        },
      },
    },
  });
};

module.exports = { getQuestionsByLessonId };
