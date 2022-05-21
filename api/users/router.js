const express = require('express');
const router = express.Router();

const parseForm = require('../../lib/parseForm');
const validateInputs = require('../../lib/validate');

const {
  checkUser,
  checkId
} = require('../../lib/validations');

const {
  postUser,
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
  verifyUser,
} = require('./controller');


/** User management routes **/

// Create a user
router.post('/', [parseForm, checkUser, validateInputs, postUser]);

// Fetch all Users
router.get('/', getAllUsers);


// Check an estate existence for subsequent routes
router.use('/:id', [checkId, validateInputs, verifyUser]);

// Fetch a User
router.get('/:id', getOneUser);

// Update a User
router.put('/:id', [parseForm, checkUser, validateInputs, editUser]);

// Remove a User
router.delete('/:id', deleteUser);


module.exports = router;
