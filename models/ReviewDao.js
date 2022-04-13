const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getReviews = async (masterId, limit) => {
  return await prisma.reviews.findMany({
    take: Number(limit),
    where: {
      master_id: Number(masterId)
    },
    select: {
      id: true,
      users: {
        select: {
          id: true,
          name: true,
        },
      },
      grade: true,
      comment: true,
      created_at: true,
    }
  })
};

const makeReview = async (masterId, userId, review) => {
  return await prisma.reviews.create({
    data: {
      master_id: Number(masterId),
      user_id: Number(userId),
      grade: review.grade,
      comment: review.comment
    }
  })
}

module.exports = { getReviews, makeReview };
