const express = require('express');
const router = express.Router();

const parseForm = require('../../lib/parseForm');
const validate = require('../../lib/validate');
const validations = require('../../lib/validations');
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
router.post('/', [parseForm, validations.user, validate, postUser]);

// Fetch all Users
router.get('/', getAllUsers);


// Check an estate existence for subsequent routes
router.use('/:id', verifyUser);

// Fetch a User
router.get('/:id', getOneUser);

// Update a User
router.put('/:id', [parseForm, validations.user, validate, editUser]);

// Remove a User
router.delete('/:id', deleteUser);


module.exports = router;
