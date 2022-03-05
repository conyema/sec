const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
// const fs = require('fs');
const debug = require('debug')('app:imageStore');
// const renameimage = require('../util/renameimage');
// const { json } = require('body-parser');

dotenv.config();
cloudinary.config({
  cloud_name: 'owi',
  api_key: '139187219659792',
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads an image to cloud storage (Cloudinary)
 * @param {string} path - Path to the image
 * @param {string} imgId - Prefered id of the image
 * @param {string} tag - Collective label to group related images
 * @param {string} folder - Optional name of folder to store the image
 * @returns {object}  An object containing the image's upload data
 */
//  const uploadImg = async (path, imgId, tag, folder = 'asset') => {
const uploadImg = async (path, imgId, tag) => {
  try {
    const options = {
      public_id: imgId,
      tags: tag,
      // folder
    };

    const { public_id, secure_url } = await cloudinary.uploader.upload(path, options);

    // Convert response to JSON
    const imgData = { imgId: public_id, url: secure_url };
    // debug(imgData);

    return imgData;
  } catch (err) {
    debug(err);
    throw new Error("Unable to upload image to cloud store");
  }
}


/**
 * Removes an image from cloud storage (Cloudinary)
 * @param {string} publicId - The name/id of the image
 * @returns {object}  An object indicating the image's deletion status
 */
const removeImg = async (publicId) => {

  try {
    const options = {
      invalidate: true
    };

    // returns  result: 'ok' or 'not found'
    const result = await cloudinary.uploader.destroy(publicId, options);
    // debug("del status", result);

    return result;
  } catch (err) {
    debug(err);
    throw new Error("Unable to delete image in cloud store");
  }
}


/**
 * Removes all resources from cloud storage (Cloudinary) from a folder
 * @param {string} tag - Collective label for related image(s)
 * @returns {object}  An object indicating the image's deletion status
 */
 const removeAllImg = async (tag) => {

  try {
    const options = {
      invalidate: true
    };

    const result = await cloudinary.api.delete_resources_by_tag(tag, options);
    // debug("del status", result);

    return result;
  } catch (err) {
    debug(err);
    throw new Error("Unable to delete images in cloud store");
  }
}


module.exports = {
  removeImg,
  removeAllImg,
  uploadImg
};
