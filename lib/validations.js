const { check, param, query } = require('express-validator');


// Validation chain for properties(estates)
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

  check('address')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString(),

  check('location', 'Estate location is required')
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

  check('bedroom', 'Number of bedrooms should be a whole number not less than 1')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('bathroom', 'Number of bathrooms should be a whole number not less than 1')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('featured', 'Do you want this estate featured?')
    .optional()
    .isBoolean()
    .toBoolean(),

  check('published', 'Do you want this estate published?')
    .optional()
    .isBoolean()
    .toBoolean(),

  check('price', 'Estate price must be a valid amount less than 10 trillion')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0, lt: 10000000000000 }),
  // .isDecimal(),

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

// Validation chain for estate query
const queryEstate = [
  query('page', 'Page should be a whole number not less than 1')
    .optional()
    .toInt()
    .isInt({ min: 1 }),

  query('max', 'Limit should be a whole number not less than 1')
    // .optional({ nullable: true, checkFalsy: true })
    .optional()
    .toInt()
    .isInt({ min: 1 }),
];

// Validation chain for estate query
const queryAuth = [
  query('returnTo', 'Cannot redirect to an invalid URL')
    .optional()
    .isURL({ require_tld: false }),
];

// Validation chain for user data
const checkUser = [
  check('email', 'Email must be valid')
    .not().isEmpty()
    .trim()
    .isEmail()
    .normalizeEmail(),

  check('password', 'Password must be at least 8 characters(including Lowercase, Uppercase, Numbers and Symbols)')
    // .optional({checkFalsy: true})
    .not().isEmpty()
    .isStrongPassword()
    // .withMessage('must contain minimum of 8 characters(including Lowercase, Uppercase, Numbers and Symbols)')
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

  check('source', 'Accepted identity providers are basic, google, facebook, twitter, linkedIn')
    // .optional({ nullable: true, checkFalsy: true })
    .not().isEmpty()
    .trim()
    .isString()
    .isIn(["basic", "google", "facebook", "twitter", "linkedIn"]),
];

// Validation chain for image metadata
const checkImg = [
  check('title', 'A title is required for file identification')
    .not().isEmpty()
    .trim()
    .isString()
];

// Validation chain for id
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
  checkUser,
  queryAuth
};
