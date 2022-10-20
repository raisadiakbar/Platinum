'use strict';
const uuid = require('uuid').v4;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
    }
  }
  Image.init({
    url: DataTypes.STRING,
    item_id: DataTypes.UUID,
    public_id: DataTypes.STRING,
    asset_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });

  Image.addHook('beforeCreate', (image) => {
    try {
      image.id = uuid();
    } catch (err) {
      throw err;
    }
  })

  return Image;
};