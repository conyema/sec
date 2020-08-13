const express = require('express');
const router = express.Router();

const { getAllEstates } = require('../estates/controllers');

router.get('/', (req, res) => {
  // throw new Error();
  res.json({message: 'Welcome to the Stella ebams consulting API!!!' });
});

//  Estate routes
router.get('/estates', getAllEstates);


module.exports = router;
