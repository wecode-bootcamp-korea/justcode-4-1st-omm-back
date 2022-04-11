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
      choiceQuestions: {
        select: {
          id: true,
          description: true,
        },
      },
    },
  });
};

const getLessonCategoryId = async (lessonId, user_id) => {
  return await prisma.$queryRaw`
  SELECT id FROM request_form WHERE lesson_category_id = ${lessonId} and user_id=${user_id};
  `;
};

const postQuestion = async (question) => {
  return await prisma.$queryRaw`
  INSERT INTO request_form (user_id, lesson_category_id, question_id, choice_question_id)
  VALUES
  (${question.user_id}, ${question.lesson_category_id}, ${question.question_id},${question.choice_question_id});
`;
};

module.exports = { getQuestions, postQuestion, getLessonCategoryId };
