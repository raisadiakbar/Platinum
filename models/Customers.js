'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate(models) {
      Customers.hasMany(models.Orders, {
        foreignKey: 'customer_id',
        as        : 'Orders'
      })
    }
  }
  Customers.init({
    user_id: DataTypes.INTEGER
    }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};
