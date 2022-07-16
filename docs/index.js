const userSchema = require('./schemas/Users');
const userPath = require('./paths/Users');
const itemsSchema = require('./schemas/Items');
const itemsPath = require('./paths/Items');
const ordersSchema = require('./schemas/Orders');
const ordersPath = require('./paths/Orders');
const customerSchema = require('./schemas/Customers');
const customerPath = require('./paths/Customers');


module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger Bingle',
    description: 'How to use E-Commerce API',
    version: '1.0.0'
  },

  schemes: [ "https", "http" ],
  securityDefinitions: {
    usersstore_auth: {
      type: "basic",
      authorizationUrl: "http://petstore.swagger.io/oauth/dialog",
      flow: "implicit",
      scopes: {
        'write:pets': "modify pets in your account",
        'read:pets': "read your pets"
      }
    }
  },
  paths: {
    ...userPath,
    ...itemsPath,
    ...ordersPath,
    ...customerPath
  },
  components: {
    schemas: {
    ...userSchema,
    ...itemsSchema,
    ...ordersSchema,
    ...customerSchema
    },
    securitySchemes: {
      binglestore_auth: {
        type: "http",
        scheme: "basic"
      }
    }
  },

}
