const createError = require("http-errors");
const debug = require("debug")("app:api-user");
// const { check, validationResult } = require('express-validator');

const service = require("./service");


const postUser = async (req, res, next) => {
  const newUser = req.body;

  try {
    const result = await service.createUser(newUser);

    res.status(201);
    return res.json({
      status: 'success',
      message: 'User created',
      data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const getAllUsers = async (req, res, next) => {
  // const { page, ...filter } = req.query;
  const filter = req.query;
  // debug( filter);

  try {
    const result = await service.selectAllUsers(filter);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Users fetched',
      data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}


module.exports = {
  postUser,
  getAllUsers,
};
