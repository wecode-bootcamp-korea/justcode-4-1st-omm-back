const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMasters = async (params) => {
  console.log("params >> ", params);
  const { addressId, lessonId } = params;

  let data = {};
  if (addressId !== "null" && lessonId !== "null") {
    data = {
      where: {
        detailAddress: {
          id: Number(addressId),
        },
        mastersCategories: {
          some: {
            lessonCategories: {
              id: Number(lessonId),
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        intro: true,
        master_image: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            grade: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    };
  } else if (addressId !== "null") {
    data = {
      where: {
        detailAddress: {
          id: Number(addressId),
        },
      },
      select: {
        id: true,
        name: true,
        intro: true,
        master_image: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            grade: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    };
  } else if (lessonId !== "null") {
    data = {
      where: {
        mastersCategories: {
          some: {
            lessonCategories: {
              id: Number(lessonId),
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        intro: true,
        master_image: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            grade: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    };
    return await prisma.masters.findMany({});
  } else {
    data = {
      select: {
        id: true,
        name: true,
        intro: true,
        master_image: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            grade: true,
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    };
  }
  return await prisma.masters.findMany(data);
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

const createMaster = async (userID, name, addressID, detailAddressID) => {
  return await prisma.masters.create({
    data: {
      user_id: userID,
      name: name,
      address_id: addressID,
      detail_address_id: detailAddressID,
    },
  });
};

const insertMasterCat = async (masterID, lessonCatID) => {

  console.log(lessonCatID)
  return lessonCatID.map(async (catID) => {
    await prisma.$queryRaw`
        INSERT INTO masters_categories (master_id, lesson_category_id, is_main)
        VALUES
        (${masterID}, ${Number(catID)}, false);
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

const getMastersByCategory = async (category) =>{
  return await prisma.$queryRaw`
  SELECT m.name as goso_name, m.master_image as image, m.work_experience as recurit, r.grade as star, COUNT(r.id) as review_sum
  FROM masters_categories
  LEFT JOIN masters m ON m.id = masters_categories.master_id
  LEFT JOIN reviews r ON r.master_id = masters_categories.master_id
  WHERE masters_categories.lesson_category_id=${category}
  GROUP BY m.name,m.master_image, m.work_experience, r.grade
  `;
};
module.exports = {
  getMasters,
  findMasterInfo,
  createMaster,
  insertMasterCat,
  findMasterAddress,
  getMasterProfile,
  setMasterProfile,
  getMasterByUserId,
  getMastersByCategory
};
