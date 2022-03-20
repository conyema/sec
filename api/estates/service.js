const models = require('../../config/sequelize/models')

const { removeImg, removeAllImg, uploadImg } = require('../../lib/imageStore');
const renameFile = require('../../lib/renameFile');


/* Define database and external API calls that concern estates here */

// const selectAllEstates = async (filter = {}, limit = 0) => {
const selectAllEstates = async () => {

  return models.estate.findAll({
    attributes: [
      'id',
      'title',
      'location',
      'category',
      'status',
      'bedroom',
      'bathroom',
    ],
    include: {
      model: models.photo,
      as: 'photos',
      where: {
        title: 'poster',
      },
      // Left join
      required: false,
    }
  })
}

const selectOneEstate = async (id) => {

  return models.estate.findOne({
    where: {
      id: Number(id)
    },
    // include: 'Photo'
    include: {
      model: models.photo,
      as: 'photos'
    }
  })
}

const createEstate = async (userId, data) => {

  return models.estate.create({
    // data,
    ...data,
    authorId: userId,
  })
}

const updateEstate = async (id, data) => {

  return models.estate.update(data, {
    where: {
      id: Number(id)
    },
  })
}

const deleteEstate = async (id, tag) => {

  // Delete all images
  await removeAllImg(tag);

  return models.estate.destroy({
    where: {
      id: Number(id)
    },
  })
}


// const postImage = async (id, path, title) => {
const postImage = async (estateId, path, title) => {
  const safeTitle = renameFile(title);
  const imgId = `${safeTitle}-${estateId}`;
  const tag = estateId;

  // Upload an image with title and ID for unique identification
  const uploadData = await uploadImg(path, imgId, tag);
  const imgData = {
    // title: `${safeTitle} of ${estate.title}`,
    title: `${safeTitle}`,
    estateId,
    ...uploadData
  };
  console.log('imgData', imgData);

  return models.photo.create(imgData);
}

// const deleteImage = async (id, title) => {
const deleteImage = async (estate, imgId) => {

  await removeImg(imgId);

  return models.photo.destroy({
    where: {
      imgId
    },
  })
}

module.exports = {
  createEstate,
  deleteEstate,
  deleteImage,
  selectAllEstates,
  selectOneEstate,
  updateEstate,
  postImage,
}
