const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
// const fs = require('fs');
const debug = require('debug')('app:fileStore');
// const renameFile = require('../util/renameFile');
// const { json } = require('body-parser');

dotenv.config();
cloudinary.config({
  cloud_name: 'owi',
  api_key: '139187219659792',
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads one file to cloud store (Cloudinary)
 * @param {object} file file to upload
 * @param {string} folderName name of folder to store the file
 * @returns {object} an object containing the file's upload data
 */

const uploadOneFile = async (path, tag, folderName = '') => {
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(path, {
      public_id: tag,
      folderName
    });
    // convert response to JSON
    const uploadData = JSON.stringify({ publicId: public_id, url: secure_url });

    return uploadData;
  } catch (err) {
    debug(err);
    throw new Error("Unable to upload file to cloud store");
  }
}

const deleteOneFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    // res: 'ok' or 'not found'
    return result;
  } catch (err) {
    debug(err);
    throw new Error("Unable to delete file in cloud store");
  }
}

module.exports = {
  deleteOneFile,
  uploadOneFile
};
