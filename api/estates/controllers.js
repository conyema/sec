const createError = require("http-errors");
const debug = require("debug")("app:estate");

const services = require("./services");

const getAllEstates = async (req, res, next) => {
  try {
    const estates = await services.selectAllEstates();
    // console.log('at cont', estates[0]);

    if (!estates[0]) {
      return next(createError(404, 'Estates not found'));
    }

    res.status(200);
    return res.json({
      status: 'success',
      data: estates
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

module.exports = { getAllEstates };
