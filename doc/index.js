require('dotenv').config();
const itemsSchema = require('./schemas/Items');
const itemsPath = require('./paths/Items');
const ordersSchema = require('./schemas/Orders');
const ordersPath = require('./paths/Orders');
const customerSchema = require('./schemas/Customers');
const customerPath = require('./paths/Customers');

const adminSchema = require('./schemas/Admins');
const adminPath = require('./paths/Admins');

const sellersPath = require('./paths/Sellers');
const sellersSchema = require('./schemas/Sellers')



module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger Bingle',
    description: 'How to use E-Commerce API',
    version: '1.0.0'
  },

  servers: [
    {
      // url: process.env.HOST,
      url: 'https://bingles.herokuapp.com',
      description: 'Swagger Bingle'
    }
  ],

  paths: {
    ...itemsPath,
    ...ordersPath,
    ...customerPath,
    ...adminPath,
    ...sellersPath
  },
  components: {
    schemas: {
    ...itemsSchema,
    ...ordersSchema,
    ...customerSchema,
    ...adminSchema,
    ...sellersSchema
    },
  
 
    securitySchemes: {
      token: {
        type: 'apiKey',
        description: 'Login to get token',
        in: 'header',
        name: 'authorization'
      }
    }
  },

}
