const express = require('express');
const router = express.Router();

const parseForm = require('../../lib/parseForm');
const validateInputs = require('../../lib/validate');

const {
  checkId,
  checkImg,
  checkEstate,
  queryEstate,
} = require('../../lib/validations');

const {
  deleteEstate,
  deleteImage,
  editEstate,
  getAllEstates,
  getOneEstate,
  postEstate,
  postImage,
  verifyEstate
} = require('./controller');


/**
 *  User management routes
 */

// Fetch all estates
router.get('/', [queryEstate, validateInputs, getAllEstates]);

// Create an estate
router.post('/', [parseForm, checkEstate, validateInputs, postEstate]);


// Check an estate existence for subsequent routes
router.use('/:id', [checkId, validateInputs, verifyEstate]);

// Fetch an estate
router.get('/:id', getOneEstate);

// Update an estate
// router.patch('/:id', [parseForm, checkEstateEdit, validateInputs, editEstate]);
router.put('/:id', [parseForm, checkEstate, validateInputs, editEstate]);

// Remove an estate
router.delete('/:id', deleteEstate);

// Upload a file (image)
// router.post('/:id/files', [parseForm, checkImg, validateInputs, postFile]);
router.post('/:id/images', [parseForm, checkImg, validateInputs, postImage]);

// Remove a file (image)
router.delete('/:id/images/:imgId', deleteImage);


module.exports = router;
