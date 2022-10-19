const SellerRouter = require('express').Router();
const SellerController = require('../controllers/SellerController');

SellerRouter.post('/register', SellerController.register);
SellerRouter.post('/login', SellerController.login);

module.exports = SellerRouter;