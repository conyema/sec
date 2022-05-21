'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await db.sequelize.sync({ force: true, match: /^dev/ });

    // return Promise.all([
    //   await queryInterface.addColumn(
    //     'Estates',
    //     'price',
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //     },
    //   ),
    // ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await db.sequelize.drop();

    // return Promise.all([
    //   queryInterface.removeColumn('estates', 'price'),
    //   queryInterface.removeColumn('estates', 'unit'),
    //   queryInterface.removeColumn('estates', 'bio'),
    // ]);
  }
};
