'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [{
      id: 'b9f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
      name: 'Item 1',
      price: '100',
      store_name: 'Store 1',
      category: 'Category 1',
      brand: 'Brand 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
