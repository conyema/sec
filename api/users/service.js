const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



/* Handle database and external API calls here */

const createUser = async (data) => {

  return prisma.user.create({
    data: { ...data },
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
  })
}



module.exports = {
  createUser,
  selectAllUsers,
  selectOneUser,
}
