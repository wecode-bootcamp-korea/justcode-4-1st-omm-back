const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getQuestions = async (lessonId) => {
  return await prisma.$queryRaw`
    select
      q.id as id,
      q.description as description,
      q.question_number as questionNumber,
      json_arrayagg(cq.id) as choiceId,
      json_arrayagg(cq.description) as choiceDescription
    from
      questions q
    join
      choice_questions cq
    on
      q.id = cq.question_id
    where
      q.lesson_category_id = ${lessonId}
    group by q.id;
  `;
};

module.exports = { getQuestions };
