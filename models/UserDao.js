const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findUserInfo = async (inputEmail, inputPhone) => {
  return await prisma.$queryRaw`
    SELECT id, name, email, user_image AS userImg, phone_number AS phoneNumber, is_deleted AS isDeleted 
    FROM users
    WHERE users.email = ${inputEmail} 
    OR users.phone_number = ${inputPhone};
  `;
};

const createUserDirectMaster = async (
  inputName,
  inputEmail,
  inputPW,
  inputPhone
) => {
  return await prisma.users.create({
    data: {
      name: inputName,
      email: inputEmail,
      password: inputPW,
      phone_number: inputPhone,
    },
  });
};

const insertPhoneNum = async (userID, inputPhone) => {
  return await prisma.$queryRaw`
    INSERT INTO users (phone_number)
    VALUES
    (${inputPhone})
    WHERE id = ${userID};
  `;
};

const sendLogIn = async (email) => {
  return await prisma.$queryRaw`
  select id,email,password from users 
  where email=${email}
  `;
};

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    select id, password from users where email= ${email};`;
};

const createUser = async (name, email, encryptedPW) => {
  return await prisma.users.create({
    data: {
      email: email,
      name: name,
      password: encryptedPW,
    },
  });
};

const getUserByUserId = async (userId) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
};

module.exports = {
  findUserInfo,
  insertPhoneNum,
  createUserDirectMaster,
  sendLogIn,
  getUserByEmail,
  createUser,
  getUserByUserId
};
