require('dotenv').config();

module.exports = { 
  development: {
    username: process.env.USERNAME_SECRET,
    password: process.env.PASSWORD_SECRET,
    database: process.env.DATABASE_SECRET,
    host: process.env.HOST_SECRET,
    port: process.env.PORT_SECRET,
    dialect: process.env.DIALECT_SECRET,
    logging: false
  },
  test: {
    username: process.env.USERNAME_SECRET,
    password: process.env.PASSWORD_SECRET,
    database: process.env.DATABASE_SECRET,
    host: process.env.HOST_SECRET,
    port: process.env.PORT_SECRET,
    dialect: process.env.DIALECT_SECRET,
    logging: false
  },
  production: {
    username: process.env.USERNAME_SECRET,
    password: process.env.PASSWORD_SECRET,
    database: process.env.DATABASE_SECRET,
    host: process.env.HOST_SECRET,
    port: process.env.PORT_SECRET,
    dialect: process.env.DIALECT_SECRET,
    logging: false,
    // "dialectOptions": {
    //   "ssl": {
    //     "require": true,
    //     rejectUnathorized: false}
    // }
  }
}
