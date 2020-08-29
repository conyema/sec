const express = require('express');
const router = express.Router();

const parseForm  = require('../util/parseForm');
const { getAllEstates, postEstate } = require('../estates/controllers');

/** Default route **/

router.get('/', (req, res) => {
  res.json({message: 'Welcome to the Stella ebams consulting API!!!' });
});

/** Estate routes **/

router.get('/estates', getAllEstates);
router.post('/estates', parseForm, postEstate);
// router.post('/estates', postEstate);


module.exports = router;
