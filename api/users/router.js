const express = require('express');
const router = express.Router();

const parseForm = require('../../util/parseForm');
const validate = require('../../util/validate');
const validations = require('../../util/validations');
const {
  postUser,
} = require('./controller');


/** User management routes **/

// Create an user
router.post('/', [parseForm, validations.user, validate, postUser]);


module.exports = router;
