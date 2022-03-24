const { check } = require('express-validator');

// validations

const estate = [
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

  check('floorSpace', 'Enter floor space in square meters')
    .optional({ nullable: true, checkFalsy: true })
    // .toFloat()
    // .isNumeric(),
    // .isFloat(),
    .isDecimal(),

  check('bedroom', 'Number of bedrooms should be a whole number')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('bathroom', 'Number of bathrooms should be a whole number')
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isInt({ min: 1 }),

  check('featured', 'Feature should be true or false')
    .optional({ nullable: true, checkFalsy: true })
    .isBoolean()
    .toBoolean(),

  check('published', 'Publish should be true or false')
    .optional({ nullable: true, checkFalsy: true })
    .isBoolean()
    .toBoolean(),

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

// const user = [
//   check('email', 'user email is required')
//     .not().isEmpty()
//     .trim()
//     .isString(),

//   check('firstName')
//     .optional({checkFalsy: true})
//     .trim()
//     .isString(),

//   check('lastName')
//     .optional({checkFalsy: true})
//     .trim()
//     .isString(),

//   check('avatar', 'enter a link to an avatar or profile photo')
//     .optional({checkFalsy: true})
//     // .isLength({ min: 3 })
//     .isURL(),

//   check('password')
//     .optional({checkFalsy: true})
//     // .trim()
//     .isString(),

//   // check('source', 'source of info is required')
//   //   .not().isEmpty()
//   //   .trim()
//   //   .isString(),

//   // check('lastVisited', 'last visited should be a date')
//   //   .optional({checkFalsy: true})
//   //   .isDate(),


//   // check('floorSpace', '')
//   //   .optional({checkFalsy: true})
//   //   .isNumeric(),

//   // check('balcony', 'Number of balconies should be a whole number')
//   //   .optional({checkFalsy: true})
//   //   .isInt(),

//   // check('petsAllowed', 'Pets allowed should be true or false')
//   //   .optional({checkFalsy: true})
//   //   .isBoolean()
// ];

const user = [
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
];

const file = [
  // check('id')
  //   .not().isEmpty()
  //   .toInt(),

  // check('id')
  //   .not().isEmpty()
  //   .isMongoId(),

  check('title', 'A title is required for file identification')
    .not().isEmpty()
    .trim()
    .isString()
];

const id = [
  // check('id')
  //   .not().isEmpty()
  //   .toInt()

  check('id')
    .not().isEmpty()
    .isMongoId(),
];

// const estateEdit = [...id, ...estate];

module.exports = {
  id,
  file,
  estate,
  // estateEdit,
  user
};
