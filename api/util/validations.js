const { check } = require('express-validator');

// validations
const estate = [
    check('name', 'Name of estate is required')
      .not().isEmpty()
      .trim()
      .isString(),

    check('description', 'Description of estate is required')
      .not().isEmpty()
      .trim()
      .isString(),

    check('locationId', 'Location ID should be an integer')
      .not().isEmpty()
      .isInt(),

    check('estateTypeId', 'Estate type ID should be an integer')
      .not().isEmpty()
      .isInt(),

    check('estateStatusId', 'Estate status ID should be an integer')
      .not().isEmpty()
      .isInt(),

    check('floorSpace', '')
      .optional()
      .isNumeric(),

    check('balcony', 'Number of balconies should be an integer')
      .optional()
      .isInt(),

    check('balconySpace', '')
      .optional()
      .isNumeric(),

    check('bedroom', 'Number of bedrooms should be an integer')
      .optional()
      .isInt(),

    check('bathroom', 'Number of bathrooms should be an integer')
      .optional()
      .isInt(),

    check('garage', 'Number of garage should be an integer')
      .optional()
      .isInt(),

    check('parkingSpace', 'Number of parking spaces should be an integer')
      .optional()
      .isInt(),

    check('petsAllowed', 'Pets allowed should be true or false')
      .optional()
      .isBoolean()
  ];

const file = [
    check('id')
      .not().isEmpty()
      .toInt(),

    check('tag', 'A tag is required for identification')
      .not().isEmpty()
      .trim()
      .isString()
  ];

const id = [
    check('id')
      .not().isEmpty()
      .toInt()
  ];

const estateEdit = [...id, ...estate];

module.exports = {
  id,
  file,
  estate,
  estateEdit,
};
