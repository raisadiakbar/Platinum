const { decode } = require("../helpers/jwt")

module.exports = {
  authentication: (req, res, next) => {
    if (!req.headers.authorization) {
      return next({
        error: 'Unauthenticated'
      })
    }

    try {
      req.user = decode(req.headers.authorization);
    } catch (err) {
      return next({ error: 'Invalid Token' })
    }

    return next();
  },
  authorization: {
    admin: (req, res, next) => {
      if (req.user.role === 1) return next();

      return next({
        error: 'Unauthorized',
        authType: 'Admin'
      })
    },
    seller: (req, res, next) => {
      if (req.user.role === 2) return next();

      return next({
        error: 'Unauthorized',
        authType: 'Seller'
      })
    },
  }
}