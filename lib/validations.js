const { check } = require('express-validator');

// validations

const estate = [
  check('title', 'Title of estate is required')
    .not().isEmpty()
    .trim()
    .isString(),

  check('description')
    // .not().isEmpty()
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

  check('video', 'Enter a URL(link) to the video')
    .optional()
    // .isLength({ min: 3 })
    .isURL(),

  check('floorSpace', 'Enter floor space in square meters')
    .optional()
    // .toFloat()
    .isNumeric(),

  // check('balcony', 'Number of balconies should be a whole number')
  //   .optional()
  //   .isInt(),

  // check('balconySpace', '')
  //   .optional()
  //   .isNumeric(),

  check('bedroom', 'Number of bedrooms should be a whole number')
    .optional()
    .toInt()
    .isInt(),

  check('bathroom', 'Number of bathrooms should be a whole number')
    .optional()
    .toInt()
    .isInt(),

  // check('garage', 'Number of garage should be a whole number')
  //   .optional()
  //   .isInt(),

  // check('parkingSpace', 'Number of parking spaces should be a whole number')
  //   .optional()
  //   .isInt(),

  // check('petsAllowed', 'Pets allowed should be true or false')
  //   .optional()
  //   .isBoolean()
];

// const user = [
//   check('email', 'user email is required')
//     .not().isEmpty()
//     .trim()
//     .isString(),

//   check('firstName')
//     .optional()
//     .trim()
//     .isString(),

//   check('lastName')
//     .optional()
//     .trim()
//     .isString(),

//   check('avatar', 'enter a link to an avatar or profile photo')
//     .optional()
//     // .isLength({ min: 3 })
//     .isURL(),

//   check('password')
//     .optional()
//     // .trim()
//     .isString(),

//   // check('source', 'source of info is required')
//   //   .not().isEmpty()
//   //   .trim()
//   //   .isString(),

//   // check('lastVisited', 'last visited should be a date')
//   //   .optional()
//   //   .isDate(),


//   // check('floorSpace', '')
//   //   .optional()
//   //   .isNumeric(),

//   // check('balcony', 'Number of balconies should be a whole number')
//   //   .optional()
//   //   .isInt(),

//   // check('petsAllowed', 'Pets allowed should be true or false')
//   //   .optional()
//   //   .isBoolean()
// ];

const user = [
  check('email', 'A valid email is required')
    .not().isEmpty()
    .trim()
    .isEmail(),

  check('password', 'A valid password is required')
    // .optional()
    .not().isEmpty()
    .isString(),

  check('firstName')
    .optional()
    .trim()
    .isString(),

  check('lastName')
    .optional()
    .trim()
    .isString(),

  check('role')
    .optional()
    .trim()
    .isString()
    .isIn(["user", "admin"]),

  check('avatar', 'Enter a link to an avatar or profile photo')
    .optional()
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
