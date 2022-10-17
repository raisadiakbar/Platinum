const adminPaths = require("./paths/adminPaths");
const itemPaths = require("./paths/itemPaths");
const sellerPaths = require("./paths/sellerPaths");

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger Auth Example',
    description: '',
    version: '1.0'
  },
  servers: [
    {
      url: process.env.HOST,
      description: 'Dev server'
    }
  ],
  components: {
    securitySchemes: {
      token: {
        type: 'apiKey',
        description: 'Login using endpoint /admin/login to get token.',
        in: 'header',
        name: 'authorization'
      }
    }
  },
  paths: {
    ...adminPaths,
    ...itemPaths,
    ...sellerPaths
  }
}