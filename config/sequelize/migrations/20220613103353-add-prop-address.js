'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await db.sequelize.sync({ force: true, match: /^dev/ });
  },

  down: async (queryInterface, Sequelize) => {
    await db.sequelize.drop();
  }
};
