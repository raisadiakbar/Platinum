const AdminRouter = require('express').Router();
const AdminController = require('../controllers/AdminController');
const { authentication, authorization } = require('../middlewares/auth');
const Validator = require('../middlewares/validator');

AdminRouter.post(
  '/register',
  Validator.body('email').notEmpty(),
  Validator.body('email').length({ min: 4 }),
  AdminController.register
);
AdminRouter.post('/login', AdminController.login);

AdminRouter.get('/', authentication, authorization.admin, AdminController.getAll);

module.exports = AdminRouter;