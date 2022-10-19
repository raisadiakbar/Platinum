'use strict';
const UUID = require('uuid').v4;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    customer_id: DataTypes.UUID,
    item_id: DataTypes.UUID,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};