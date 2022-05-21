const models = require('../../config/sequelize/models')


const renameFile = require('../../lib/renameFile');
const {
  removeImg,
  removeAllImg,
  uploadImg
} = require('../../lib/imageStore');


/* Define database and external API calls that concern estates here */

// const selectAllEstates = async (filter = {}, limit = 0) => {
const selectAllEstates = async (offset, limit, filter) => {
  let queryFilter = {};
  if (filter.featured) {
    queryFilter.featured = true;
  }

  return models.estate.findAndCountAll({
    attributes: [
      'id',
      'title',
      'location',
      'category',
      'status',
      'featured',
      'bedroom',
      'bathroom',
      'createdAt'
    ],
    where: queryFilter,
    include: {
      // include photos that are posters
      model: models.photo,
      as: 'photos',
      where: {
        title: 'poster',
      },
      // Left join
      required: false,
    },
    order: [['featured', 'DESC'], ['createdAt', 'DESC']],
    offset,
    limit
    // offset: Number(skip),
    // limit: Number(max)
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
