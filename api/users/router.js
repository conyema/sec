const express = require('express');
const router = express.Router();

const parseForm = require('../../util/parseForm');
const validate = require('../../util/validate');
const validations = require('../../util/validations');
const {
  postUser,
  getAllUsers,
  getOneUser,
  editUser,
} = require('./controller');


/** User management routes **/

// Create an user
router.post('/', [parseForm, validations.user, validate, postUser]);

// Fetch all Users
router.get('/', getAllUsers);

// Fetch a User
router.get('/:id', getOneUser);

// Update a User
router.put('/:id', [parseForm, validations.user, validate, editUser]);


module.exports = router;
