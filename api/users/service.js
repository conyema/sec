const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



/* Handle database and external API calls here */

const createUser = async (data) => {

  return prisma.user.create({
    data: { ...data },
  })
}


module.exports = {
  createUser,
}
