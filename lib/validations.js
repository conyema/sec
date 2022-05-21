const { check, param, query } = require('express-validator');


// Validation chains for properties(estates)
const checkEstate = [
  check('title', 'Title of estate is required')
    .not().isEmpty()
    .trim()
    .isString(),

  check('description')
    // .not().isEmpty()
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString(),

  check('location', 'Location is required')
    .not().isEmpty()
    .trim()
    .isString(),

  check('category', 'Estate category is required')
    .not().isEmpty()
    .trim()
    .isString()
    .isIn(["residential", "land", "industrial", "commercial"]),

  check('status', 'Estate status is required')
    .not().isEmpty()
    .trim()
    .isString(),

  check('video', 'Enter a secure & valid url to a video tour of estate')
    // .optional()
    // .isLength({ min: 3 }),
    .optional({ nullable: true, checkFalsy: true })
    .isURL(),

  check('floorSpace', 'Floor space must be a valid measurement less than 100 million')
    .optional({ nullable: true, checkFalsy: true })
    // .toFloat()
    // .isNumeric(),
    // .isDecimal({ decimal_digits: '3' }),
    .isFloat({ min: 0, lt: 100000000 }),

  check('bedroom', 'Number of bedrooms should be a whole number')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('bathroom', 'Number of bathrooms should be a whole number')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('featured', 'Feature should be true or false')
    .optional()
    .isBoolean()
    .toBoolean(),

  check('published', 'Publish should be true or false')
    .optional()
    .isBoolean()
    .toBoolean(),

  check('price', 'Estate price must be a valid amount less than 10 trillion')
    .optional({ nullable: true, checkFalsy: true })
    .isDecimal(),

  check('currency', 'Estate curency must be naira or dollar')
    .optional()
    .trim()
    .isString()
    .isIn(["naira", "dollar"]),

  check('measure', 'Allowed values are acre, hectare, plot, sq ft, sq m, unit(default)')
    .optional()
    .trim()
    .isString()
    .isIn(["acre", "hectare", "sq ft", "sq m", "unit", "plot"]),


  // check('balcony', 'Number of balconies should be a whole number')
  //   .optional({checkFalsy: true})
  //   .isInt(),

  // check('balconySpace', '')
  //   .optional({checkFalsy: true})
  //   .isNumeric(),

  // check('garage', 'Number of garage should be a whole number')
  //   .optional({checkFalsy: true})
  //   .isInt(),

  // check('parkingSpace', 'Number of parking spaces should be a whole number')
  //   .optional({checkFalsy: true})
  //   .isInt(),

  // check('petsAllowed', 'Pets allowed should be true or false')
  //   .optional({checkFalsy: true})
  //   .isBoolean()
];

// Validation chains for estate query
const queryEstate = [
  query('page', 'page should be a whole number not less than 1')
    .optional()
    .toInt()
    .isInt({ min: 1 }),

  query('max', 'limit should be a whole number not less than 1')
    // .optional({ nullable: true, checkFalsy: true })
    .optional()
    .toInt()
    .isInt({ min: 1 }),
];

// Validation chains for user data
const checkUser = [
  check('email', 'A valid email is required')
    .not().isEmpty()
    .trim()
    .isEmail()
    .normalizeEmail(),

  check('password', 'A valid password is required')
    // .optional({checkFalsy: true})
    .not().isEmpty()
    .isStrongPassword()
    .withMessage('must contain minimum of 8 characters(including Lowercase, Uppercase, Numbers and Symbols)')
    .isString(),

  check('firstName')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString(),

  check('lastName')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString(),

  check('role')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .toLowerCase()
    .isString()
    .isIn(["user", "admin"]),

  check('avatar', 'Enter a link to an avatar or profile photo')
    .optional({ nullable: true, checkFalsy: true })
    .isURL(),

  check('source', 'Accepted providers are local, google, facebook, twitter, linkedIn')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString()
    .isIn(["local", "google", "facebook", "twitter", "linkedIn"]),
];

// Validation chains for image metadata
const checkImg = [
  check('title', 'A title is required for file identification')
    .not().isEmpty()
    .trim()
    .isString()
];

// Validation chains for id
const checkId = [
  check('id')
    .not().isEmpty()
    .toInt()
    .isInt(),
];

// const checkImgId = [
//   check('id')
//     .not().isEmpty()
//     .toInt()
//     .isInt(),
// ];

// const estateEdit = [...id, ...estate];

module.exports = {
  checkId,
  checkImg,
  checkEstate,
  queryEstate,
  checkUser
};
