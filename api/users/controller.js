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


const getOneUser = async (req, res, next) => {
  // use or return already verified User data
  // const { user } = req;
  const { id } = req.params;

  try {
    const result = await service.selectOneUser(id);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'User fetched',
      data: result
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const editUser = async (req, res, next) => {
  const { id } = req.params;
  const dataInput = req.body;

  // debug(id, dataInput);

  try {
    const result = await service.updateUser(id, dataInput);

    res.status(200);
    return res.json({
      status: 'success',
      message: 'User updated',
      data: result,
      // data: { id, ...dataInput }
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const imgTag = id;

  try {
    await service.deleteUser(id);
    // await service.deleteUser(id, imgTag);

    res.status(200);
    return res.json({
      status: 'success',
      // message: 'User profile and related images deleted',
      message: 'User profile deleted',
    });
  } catch (err) {
    debug(err);
    next(err);
  }
}

module.exports = {
  postUser,
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
};
