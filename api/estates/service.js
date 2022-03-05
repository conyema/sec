const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const { removeImg, removeAllImg, uploadImg } = require('../../util/imageStore');
const renameFile = require('../../util/renameFile');


/* Define database and external API calls that concern estates here */

// const selectAllEstates = async (filter = {}, limit = 0) => {
const selectAllEstates = async () => {

  return prisma.estate.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      category: true,
      status: true,
      bedroom: true,
      bathroom: true,
      // photos: true,
      photos: {
        where: {
          title: "poster",
        },
      }
    },
  })
}

const selectOneEstate = async (id) => {

  return prisma.estate.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      photos: true,
    },
  })
}

const createEstate = async (userId, data) => {

  return prisma.estate.create({
    // data,

    data: {
      ...data,
      author: {
        connect: { id: userId },
      },
    },
  })
}

const updateEstate = async (id, data) => {


  return prisma.estate.update({
    where: {
      id: Number(id)
    },
    data
  })
}

const deleteEstate = async (id, tag) => {

  // Delete all images
  await removeAllImg(tag);

  return prisma.estate.delete({
    where: {
      id: Number(id)
    },
  })
}


// const postImage = async (estateId, path, title) => {
const postImage = async (id, path, title) => {

  const safeTitle = renameFile(title);
  const imgId = `${safeTitle}-${id}`;
  const tag = id;

  // Upload an image with title and ID for unique identification
  const uploadData = await uploadImg(path, imgId, tag);
  const imgData = {
    // title: `${safeTitle} of ${estate.title}`,
    title: `${safeTitle}`,
    ...uploadData
  };


  return prisma.photo.create({
    data: {
      ...imgData,
      estate: {
        connect: { id: Number(id) },
      },
    },
  })
}

// const deleteImage = async (id, title) => {
const deleteImage = async (estate, imgId) => {

  await removeImg(imgId);

  return prisma.photo.delete({
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
