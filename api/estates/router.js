const express = require('express');
const router = express.Router();

const parseForm = require('../../lib/parseForm');
const validate = require('../../lib/validate');
const validations = require('../../lib/validations');
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


// Fetch all estates
router.get('/', getAllEstates);

// Create an estate
// router.post('/', [parseForm, validations.estate, validate, postEstate]);
router.post('/', [parseForm, validations.estate, validate, postEstate]);

// Check an estate existence for subsequent routes
router.use('/:id', verifyEstate);

// Fetch an estate
// router.get('/:id', [validations.id, getOneEstate]);
router.get('/:id', getOneEstate);

// Update an estate
// router.patch('/:id', [parseForm, validations.estateEdit, validate, editEstate]);
// router.patch('/:id', [parseForm, editEstate]);
router.put('/:id', [parseForm, validations.estate, validate, editEstate]);

// Remove an estate
// router.delete('/:id', [validations.id, deleteEstate]);
router.delete('/:id', deleteEstate);

// Upload a file (image)
// router.post('/:id/files', [parseForm, validations.file, validate, postFile]);
router.post('/:id/images', [parseForm, validations.file, validate, postImage]);

// Remove a file (image)
router.delete('/:id/images/:imgId', deleteImage);


module.exports = router;
