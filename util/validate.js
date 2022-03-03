const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
  let { files = {} } = req;

  const errors = validationResult(req);
  const hasFile = Object.keys(files).length !== 0 && files.constructor === Object;


  // Request contains file(s): handle error in the controller to clean up temp(upload) folder
  if (hasFile) {
    req.errors = errors.array();

    return next();
  }

  // Error in input field values and request has no file
  if (!errors.isEmpty()) {

    res.status(422);
    return res.json({
      status: 'failure',
      message: 'Your submission contains errors',
      errors: errors.array()
    });
  }
  next();
};
