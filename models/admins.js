'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
    }
  }
  Admins.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    profile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Admins',
  });

  Admins.addHook('beforeCreate', (admin, options) => {
    try {
      admin.id = uuid.v4();
      admin.password = hash(admin.password);
    } catch (err) {
      throw err;
    }

  });
  return Admins;
};