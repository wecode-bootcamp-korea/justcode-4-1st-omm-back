const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMasters = async () => {
  try {
    const search = await prisma.users.findMany({
      where: { NOT: { masters: null } },
      select: {
        id: true,
        name: true,
        masters: {
          select: {
            name: true,
            master_image: true,
            intro: true,
            work_experience: true,
            reviews: {
              select: {
                comment: true,
                grade: true,
              },
            },
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

const getMasterProfile = async (masterId) => {
  return await prisma.masters.findUnique({
    where: {
      id: masterId,
    },
    select: {
      id: true,
      name: true,
      intro: true,
      master_image: true,
      start_time: true,
      end_time: true,
      work_experience: true,
      employee_number: true,
      address: {
        select: {
          id: true,
          name: true,
        },
      },
      detailAddress: {
        select: {
          id: true,
          name: true,
        },
      },
      mastersCategories: {
        select: {
          id: true,
          is_main: true,
          lessonCategories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      reviews: {
        select: {
          id: true,
          grade: true,
          comment: true,
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

const setMasterProfile = async (params) => {
  const { type, value, user } = params;

  return await prisma.$queryRaw`
  UPDATE masters t SET t.${type} = ${value} WHERE t.id = ${user.id}
  `;
};

const getMasterByUserId = async (userId) => {
  return await prisma.masters.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
};
module.exports = {
  getMasters,
  findMasterInfo,
  createMaster,
  insertMasterCat,
  findMasterAddress,
  insertMasterAddress,
  getMasterProfile,
  setMasterProfile,
  getMasterByUserId,
};
