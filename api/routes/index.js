const express = require('express');
const router = express.Router();

const parseForm  = require('../util/parseForm');
const { deleteEstate, editEstate, getAllEstates, postEstate, getOneEstate} = require('../estates/controllers');

/** Default route **/

router.get('/', (req, res) => {
  res.json({message: 'Welcome to the Stella ebams consulting API!!!' });
});

/** Estate routes **/

router.get('/estates', getAllEstates);
router.get('/estates/:id', getOneEstate);
router.post('/estates', parseForm, postEstate);
router.patch('/estates/:id', parseForm, editEstate);
router.delete('/estates/:id', deleteEstate);
// router.post('/estates', postEstate);

module.exports = router;
