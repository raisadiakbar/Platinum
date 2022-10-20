'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Customers, {foreignKey: 'customer_id',});
      Orders.belongsTo(models.Items, {foreignKey: 'item_id'});

    }
  }
  Orders.init({
    customer_id   : DataTypes.UUID,
    item_id       : DataTypes.UUID,
    qty           : DataTypes.INTEGER,
    amount        : DataTypes.INTEGER,
    status        : DataTypes.STRING,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });

  Orders.addHook('beforeCreate', (order) => {
    order.id = uuid.v4();
  })

  return Orders;
};