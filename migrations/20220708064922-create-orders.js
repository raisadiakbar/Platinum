'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.BIGINT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
        format: 'enum',
        values: ['pending', 'approved', 'rejected']
      },
      payment_method: {
        type: Sequelize.STRING,
        defaultValue: 'cash',
        format: 'enum',
        values: ['cash', 'credit']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};