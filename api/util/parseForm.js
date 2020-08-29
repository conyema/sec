const formidable = require('formidable');

const parseForm = (req, res, next) => {
  // Skip middleware if request does not contain form-data
  if (!req.is('multipart/form-data')) {
    console.log('req: does not contain a form-data');
    next();
  }

  const form = formidable({
    multiples: true,
    uploadDir: './api/uploads/',
    keepExtensions: true,
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
