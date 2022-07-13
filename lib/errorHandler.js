/* eslint-disable no-unused-vars */

const debug = require("debug")("api:server");

module.exports = (err, req, res, next) => {
  let { parent, fields } = err;
  // Input out of bounds
  // if (parent && parent.errno == 1264)

  // Duplicate record error
  if (parent && parent.errno == 1062) {
    err.status = 400;
    err.message = `User account with ${fields.email} already exists`;
  } else if (parent && parent.errno) {
    // Other DB errors exist: do not send them to user
    err.status = 400;
    err.message = `Operation not successful. Check for errors and try again`;
  }

  // debug('err', err);

  // res.sendStatus(err.status || 500);
  res.status(err.status || 500);
  res.json({
    status: 'error',
    // error: err.message
    message: err.message || 'Something happened. Please wait a while and try again'
    // message: 'Something happened. Please wait a while and try again'
  });
};
