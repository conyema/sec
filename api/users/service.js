const models = require('../../config/sequelize/models')


/* Handle database and external API calls here */

const createUser = async (data) => {

  return models.user.create(data);
}

// const selectAllUsers = async (filter = {}, limit = 0) => {
const selectAllUsers = async () => {

  return models.user.findAll({})
}

const selectOneUser = async (id) => {

  return models.user.findOne({
    where: {
      id: Number(id)
    },
    include: {
      model: models.estate,
      as: 'estates'
    }
  })
}

const findUserByEmail = async (email) => {

  return models.user.findOne({
    where: {
      email
    },
  })
}

const updateUser = async (id, data) => {
  // Avoid constrain error on Unique field: Do not modify email
  delete data.email;

  return models.user.update(data, {
    where: {
      id: Number(id)
    },
  })
}

// const deleteUser = async (id, tag) => {
const deleteUser = async (id) => {

  // Delete user images in cloud storage
  // await removeAllImg(tag);

  return models.user.destroy({
    where: {
      id: Number(id)
    },
  })
}



module.exports = {
  createUser,
  selectAllUsers,
  selectOneUser,
  findUserByEmail,
  updateUser,
  deleteUser,
}
