const formidable = require('formidable');
const debug = require('debug')('app:parseForm');

const parseForm = (req, res, next) => {
  // throw error if request does not contain form-data
  if (!req.is('multipart/form-data')) {
    debug('No data submitted');
    throw new Error('No data submitted');
    // next();
  }

  const form = formidable({
    // uploadDir: 'api/uploads',
    multiples: true,
    // enabledPlugins: ['json'],
    uploadDir: 'uploads',
    keepExtensions: true,
    allowEmptyFiles: false,
    filter: function ({ mimetype }) {
      // keep only images
      return mimetype && mimetype.includes("image");
    },
    maxFileSize: 5 * 1024 * 1024 // 5mb max
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }

    req.files = files;
    req.body = fields;
    // debug("inputs", fields);
    return next();
  });
};

module.exports = parseForm;
