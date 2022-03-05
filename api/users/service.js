const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



/* Handle database and external API calls here */

const createUser = async (data) => {

  return prisma.user.create({
    data,
  })
}

const selectAllUsers = async (filter = {}, limit = 0) => {

  return prisma.user.findMany({})
}

const selectOneUser = async (id) => {

  return prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      estates: true,
    },
  })
}

const updateUser = async (id, data) => {
  // Avoid constrain error on Unique field: Do not modify email
  delete data.email;

  return prisma.user.update({
    where: {
      id: Number(id)
    },
    data
  })
}

const deleteUser = async (id, tag) => {

  // Delete user images in cloud storage
  // await removeAllImg(tag);

  return prisma.user.delete({
    where: {
      id: Number(id)
    },
  })
}



module.exports = {
  createUser,
  selectAllUsers,
  selectOneUser,
  updateUser,
  deleteUser,
}
