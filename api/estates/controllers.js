const createError = require("http-errors");
const fs = require('fs');
const debug = require("debug")("app:estate");

const services = require("./services");
// const files

const getAllEstates = async (req, res, next) => {
  try {
    const { rows } = await services.selectAllEstates();
    // const estates = result.rows

    if (!rows[0]) {
      return next(createError(404, 'No estate available yet'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const getOneEstate = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { rows, rowCount } = await services.selectOneEstate(id);

    if (rowCount === 0) {
      return next(createError(404, 'Estate does not exist'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const postEstate = async (req, res, next) => {
  const data = req.fields;

  try {
    // const { rows } = await services.createEstate();
    const { rows } = await services.createEstate(data);

    res.status(201);
    return res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const editEstate = async (req, res, next) => {
  const data = req.fields;
  // const id = parseInt(req.params.id, 10);
  const id = req.params.id;

  try {
    const { rows, rowCount } = await services.updateEstate(id, data);

    if (rowCount === 0) {
      return next(createError(404, 'Estate does not exist'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      // message: 'Estate update successful',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const deleteEstate = async (req, res, next) => {
  // const id = parseInt(req.params.id, 10);
  const id = req.params.id;

  try {
    const { rowCount } = await services.deleteEstate(id);

    if (rowCount === 0) {
      return next(createError(404, 'Estate does not exist'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Estate deleted successful',
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const postFile = async (req, res, next) => {
  const noImage = req.files.image === undefined || req.files.image.size === 0;
  const noTag = req.fields.tag === undefined || req.fields.tag === '';

  try {
    // Reject if request does not contain a file or
    if (noImage || noTag) {
      return next(createError(400, 'You need to upload a file with an identifying tag'));
    }

    // get request data
    const id = req.params.id;
    const { path } = req.files.image;
    const { tag } = req.fields;

    const { rows, rowCount } = await services.uploadFile(id, path, tag);

    if (rowCount === 0) {
      return next(createError(400, 'Estate does not exist'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      message: 'File upload was successful',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  } finally {
    // delete temporary file (if available) whether upload is successful or not
    const noFile = req.files.image === undefined
    if (!noFile) {
      const { path } = req.files.image;
      fs.unlink(path, () => debug("temporary file deleted"));
    }
  }
}

const deleteFile = async (req, res, next) => {
  const { id } = req.params;
  const { tag } = req.query;

  try {
    const { rows, rowCount } = await services.deleteFile(id, tag);

    if (rowCount === 0) {
      return next(createError(404, 'image does not exist'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      message: 'image deleted successfully',
      data: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

module.exports = {
  deleteEstate,
  deleteFile,
  editEstate,
  getAllEstates,
  getOneEstate,
  postEstate,
  postFile,
};
