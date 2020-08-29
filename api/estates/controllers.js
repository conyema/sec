const createError = require("http-errors");
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

const postEstate = async (req, res, next) => {
  const { thumbnail } = req.files;
  const data = req.fields;

  try {
    // const { rows } = await services.createEstate();
    const { rows } = await services.createEstate(data, thumbnail);

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

module.exports = {
  getAllEstates,
  postEstate
};
