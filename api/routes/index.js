const express = require('express');
const router = express.Router();


/** Routes **/

// Home
router.get('/', (req, res) => {
  res.json({ message: 'Welcome !!!' });
  // res.render('form');
});


module.exports = router;
