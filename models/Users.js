'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Customers, {
        foreignKey: 'user_id',
        as        : 'Customers'
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telepon: DataTypes.INTEGER,
    Address: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};


