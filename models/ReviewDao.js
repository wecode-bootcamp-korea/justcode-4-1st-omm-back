const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const sendPreview = async (masterId) => {
  try {
    return await prisma.$queryRaw`
        SELECT r.user_id AS userId, r.grade, r.comment
        FROM reviews r
        JOIN masters m
        ON r.master_id = m.id
        WHERE m.id = ${masterId}
        LIMIT 3;
        `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
}

const sendReviews = async (masterId) => {
  try {
    return await prisma.$queryRaw`
        SELECT r.user_id AS userId, r.grade, r.comment
        FROM reviews r
        JOIN masters m
        ON r.master_id = m.id
        WHERE m.id = ${masterId};
        `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

module.exports = { sendPreview, sendReviews };