const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs');
const debug = require('debug')('app:fileStore');
const renameFile = require('../util/renameFile')

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

const uploadOneFile = async (file, folderName = '') => {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      public_id: renameFile(file),
      folderName
    });

    return response;
  } catch (err) {
    // throw
    debug(err);
    throw new Error("Unable to upload file at the moment");
  } finally {
    // delete temporary file whether upload is successful or not
    fs.unlink(file.path, () => debug("temporary file deleted"));
  }
}

module.exports = {
  uploadOneFile
};
