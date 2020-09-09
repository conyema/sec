const express = require('express');
const router = express.Router();

const parseForm  = require('../util/parseForm');
const { deleteEstate, deleteFile, editEstate, getAllEstates, getOneEstate, postEstate, postFile } = require('../estates/controllers');

/** Default route **/

router.get('/', (req, res) => {
  res.json({message: 'Welcome to the Stella ebams consulting API!!!' });
});

/** Estate management routes **/

// fetch all estates
router.get('/estates', getAllEstates);

// fetch an estate
router.get('/estates/:id', getOneEstate);

// create an estate
router.post('/estates', parseForm, postEstate);

// update an estate
router.patch('/estates/:id', parseForm, editEstate);

// remove an estate
router.delete('/estates/:id', deleteEstate);

// upload a file (image)
router.post('/estates/:id/files', parseForm, postFile);

// remove a file (image)
router.delete('/estates/:id/files', deleteFile);


module.exports = router;
