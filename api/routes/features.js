const express = require('express');
const router = express.Router();

const parseForm  = require('../util/parseForm');
const validate = require('../util/validate');
const validations = require('../util/validations');
const { deleteEstate, deleteFile, editEstate, getAllEstates, getOneEstate, postEstate, postFile } = require('../estates/controllers');

/** Default route **/

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Stella ebams consulting API Route!!!' });
});

/** Estate management routes **/

// fetch all estates
router.get('/estates', getAllEstates);

// fetch an estate
router.get('/estates/:id', validations.id, getOneEstate);

// create an estate
router.post('/estates', parseForm, validations.estate, validate, postEstate);

// update an estate
router.patch('/estates/:id', parseForm, validations.estateEdit, validate, editEstate);

// remove an estate
router.delete('/estates/:id', validations.id, deleteEstate);

// upload a file (image)
router.post('/estates/:id/files', parseForm, validations.file, validate, postFile);

// remove a file (image)
router.delete('/estates/:id/files', validations.file, validate, deleteFile);


module.exports = router;
