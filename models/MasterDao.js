const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMasters = async () => {
  try {
    const search = await prisma.masters.findMany({
      select: {
        name: true,
        intro: true,
        work_experience: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            grade: true,
          },
        },
      },
    });

    return search;
  } catch (err) {}
};

const findMasterInfo = async (userID) => {
  return await prisma.$queryRaw`
    SELECT id, user_id AS userID, intro, 
    start_time AS startTime, end_time AS endTime,
    work_experience AS workExperience, employee_number AS employeeNumber, 
    is_deleted AS isDeleted,
    created_at AS createdAt, updated_at AS updatedAt
    FROM masters
    WHERE id = ${userID};
  `;
};

const createMaster = async (userID, name) => {
  return await prisma.masters.create({
    data: {
      user_id: userID,
      name: name,
    },
  });
};

const insertMasterCat = async (masterID, lessonCatID) => {
  return lessonCatID.map(async (catID) => {
    await prisma.$queryRaw`
        INSERT INTO masters_categories (master_id, lesson_category_id, is_main)
        VALUES
        (${masterID}, ${catID}, false);
    `;
  });
};

const findMasterAddress = async (address, detailAddress) => {
  const addressID = await prisma.$queryRaw`
      SELECT id FROM address
      WHERE name = ${address};
  `;

  const detailAddressID = await prisma.$queryRaw`
      SELECT id FROM detail_address
      WHERE name = ${detailAddress};
  `;

  return { addressID, detailAddressID };
};

const insertMasterAddress = async (masterID, addressID, detailAddressID) => {
  return await prisma.$queryRaw`
    INSERT INTO masters_address (master_id, address_id, detail_address_id)
    VALUES
    (${masterID}, ${addressID}, ${detailAddressID});
  `;
};

module.exports = {
  getMasters,
  findMasterInfo,
  createMaster,
  insertMasterCat,
  findMasterAddress,
  insertMasterAddress,
};
