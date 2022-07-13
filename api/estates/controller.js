// const fs = require('fs');
// const { readdir } = require('fs/promises');
const {
  readdir,
  unlink
} = require('fs').promises;

const path = require('path');
const createError = require("http-errors");
const debug = require("debug")("api:estate");
// const { validationResult } = require('express-validator');

const service = require("./service");
// const { count } = require('console');


const verifyEstate = async (req, res, next) => {
  const { id } = req.params;


  try {
    const result = req.user ? await service.selectOneEstate(id)
      : await service.feedOneEstate(id);

    // It exists: move to next handler
    if (result) {
      req.estate = result;
      return next();
    }

    // It does not exist
    res.status(404);
    return res.json({
      status: 'error',
      // error: 'Estate does not exist'
      message: 'Estate does not exist',
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const getAllEstates = async (req, res, next) => {
  const { limit = 10, page = 1, ...filter } = req.query;
  // const limit = max;
  const offset = (page - 1) * limit;

  let queryFilter = {
    published: true
  };

  if (filter.featured) {
    queryFilter.featured = true;
  }

  // debug('hereFilter', filter, queryFilter);
  // debug('user', req.user);

  // debug("req-detials: ", req.protocol, req.hostname, req.socket);

  try {
    const { rows, count } = req.user ? await service.selectAllEstates()
      : await service.feedAllEstates(offset, limit, queryFilter);

    const hasMore = count > (limit * page);


    res.status(200);
    return res.json({
      status: 'success',
      message: 'Estates fetched',
      totalCount: count,
      hasMore,
      data: rows,
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const getOneEstate = async (req, res, next) => {
  // use or return already verified estate data
  const { estate } = req;

  try {
    // debug('estateId:', estate.id);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Estate fetched',
      data: estate
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const postEstate = async (req, res, next) => {
  const dataInput = req.body;
  let userId;

  // Todo: use real userId when auth is implemented
  if (req.user) {
    userId = req.user.id;
  } else {
    userId = 1
  }


  try {
    const result = await service.createEstate(userId, dataInput);

    res.status(201);
    return res.json({
      status: 'success',
      message: 'Estate created',
      data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const editEstate = async (req, res, next) => {
  const { id } = req.params;
  const dataInput = req.body;

  debug(id, dataInput);

  try {
    // const { result, modifiedCount } = await service.updateEstate(data);
    const result = await service.updateEstate(id, dataInput);
    // await service.updateEstate(id, dataInput);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Estate updated',
      data: result,
      // data: { id, ...dataInput }
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const deleteEstate = async (req, res, next) => {
  const { id } = req.params;
  const imgTag = id;
  const hasImg = req.estate.photos[0] ? true : false;
  debug('has img', hasImg);

  try {
    // await service.deleteEstate(id);
    await service.deleteEstate(id, imgTag, hasImg);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Estate and related images deleted',
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const postImage = async (req, res, next) => {
  // const { body, params, files, estate, errors = [] } = req;
  const { body, files, estate, errors = [] } = req;

  // Obtain (first) image data if available or return an empty object
  const image = Object.values(files)[0] || {};

  // Get necessary request data
  const { filepath, size, mimetype } = image;
  const { title } = body;
  // const { id } = params;

  // const isImage = req.files.image === undefined || req.files.image.size === 0;
  // const isImage = size !== undefined && filepath !== undefined;
  const isImage = size !== undefined && mimetype.includes("image");


  // Reject if request does not contain an image
  if (!isImage) {
    return next(createError(400, 'Please upload an image'));
  }

  try {
    // Reject if input field contains errors (error array is not empty)
    if (errors.length) {
      res.status(422);
      return res.json({
        status: 'failure',
        message: 'Check your submission for errors',
        errors
      });
    }

    const result = await service.postImage(estate.id, filepath, title);
    // const result = await service.postImage(estate, filepath, title);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'File upload was successful',
      data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  } finally {
    // Image(s) Folder
    const imgDir = path.dirname(filepath);

    // Delete all temporary images (if available) whether upload is successful or not

    // fs.unlink(filepath, () => debug("temporary image deleted"));
    // await readdir(imgDir)
    // .then((f) => Promise.all(f.map(img => unlink(path.join(imgDir, img)))))
    // .then(() => debug("all temporary images deleted"))
    // .catch((e) => debug(e));

    await readdir(imgDir)
      .then((files) => {
        Promise.all(files.map(img => unlink(path.join(imgDir, img))));
        return debug("all temporary images deleted")
      })
      .catch((e) => debug(e));
  }
}

const deleteImage = async (req, res, next) => {
  // const { estate, params } = req;
  const { estate, params: { imgId } } = req;
  // const { id } = req.params;
  // const { title } = req.query;
  // const { imgId } = req.params;
  // debug(params, estate);

  try {
    // await service.deleteImage(id, title);
    await service.deleteImage(estate, imgId);


    res.status(200);
    return res.json({
      status: 'success',
      message: 'Image deleted',
      // data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

module.exports = {
  deleteEstate,
  deleteImage,
  editEstate,
  getAllEstates,
  getOneEstate,
  postEstate,
  postImage,
  verifyEstate
};
