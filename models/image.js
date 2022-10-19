'use strict';
const UUID = require('uuid').v4;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init({
    url: DataTypes.STRING,
    item_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};