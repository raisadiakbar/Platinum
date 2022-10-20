'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface
      .addColumn('Sellers', 'photo', { type: DataTypes.STRING });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Sellers', 'photo');
  }
};