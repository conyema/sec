const formidable = require('formidable');
const debug = require('debug')('app:parseForm');

const parseForm = (req, res, next) => {
  // throw error if request does not contain form-data
  if (!req.is('multipart/form-data')) {
    debug('There is no form to parse!!!');
    throw new Error('There is no form to parse!!!');
  }

  const form = formidable({
    uploadDir: './api/uploads/',
    keepExtensions: true,
    // multiples: true,
    // encoding: 'utf-8',
    // enabledPlugins: ['json'],
    // maxFileSize: 1024
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }
    req.files = files;
    req.fields = fields;
    return next();
  });
};

module.exports = parseForm;
