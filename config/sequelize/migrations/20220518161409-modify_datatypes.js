'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.changeColumn('Estate', 'price', {
      type: Sequelize.DataTypes.DECIMAL(15, 2)
    });

    queryInterface.changeColumn('Estate', 'floorSpace', {
      type: Sequelize.DataTypes.FLOAT(2)
    });

    queryInterface.changeColumn('Estate', 'measure', {
      type: Sequelize.DataTypes.ENUM,
      values: ["acre", "hectare", "sq ft", "sq m", "unit", "plot"],
      defaultValue: "unit"
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
