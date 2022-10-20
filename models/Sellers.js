'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Sellers extends Model {
    static associate(models) {
    }
  }
  Sellers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sellers',
  });

  Sellers.addHook('beforeCreate', (seller, options) => {
    try {
      seller.id = uuid.v4();
      seller.password = hash(seller.password);
    } 
    catch (err) {
      throw err;
    }
  }
  );
  
  return Sellers;
};