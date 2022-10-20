'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');
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
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customers',
  });

  Customers.addHook('beforeCreate', (customer, options) => {
    try {
      customer.id = uuid.v4();
      customer.password = hash(customer.password);
    } catch (err) {
      throw err;
    }
  });
  return Customers;
};
