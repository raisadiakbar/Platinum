'use strict';
const UUID = require('uuid').v4;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  item.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    seller_id: DataTypes.UUID,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};