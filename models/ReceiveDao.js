const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getGosoList = async (lesson_category_id) => {
  return await prisma.$queryRaw`
  select JSON_OBJECT('goso',masters_categories.id), lesson_category_id
  from masters_categories
  where lesson_category_id = ${lesson_category_id}
  `;
};
const getReceive = async (userId) => {
  return await prisma.$queryRaw`
  select JSON_ARRAYAGG(request_form.choice_question_id) as choice_question, ANY_VALUE(request_form.user_id),
  lc.name as category, UNIX_TIMESTAMP(request_form.ended_at) as ended_at, request_form.lesson_category_id,
  ANY_VALUE(DATE_FORMAT(request_form.created_at,'%Y-%m-%d')) as created_at, lc.image
  from request_form
  left join lesson_categories lc on lc.id = request_form.lesson_category_id
  where request_form.user_id=${userId}
  group by request_form.lesson_category_id, request_form.ended_at
  `;
};

const setReceive = async (ended_at) => {
  console.log("time2", ended_at);
  return await prisma.$queryRaw`
  UPDATE request_form SET ended_at=DATE_SUB(NOW(), INTERVAL 7 DAY) WHERE UNIX_TIMESTAMP(ended_at) = ${Number(
    ended_at
  )};
  `;
};

module.exports = { getReceive, getGosoList, setReceive };
