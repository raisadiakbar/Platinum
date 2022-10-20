const router = require('express').Router();
const controller = require('../controller/Customers');
const multer = require('../../config/multer');
const { authentication, authorization } = require('../../middleware/auth');
const Validator = require('../../middleware/validator');

router.post('/register', multer.single('photo'), controller.register);
router.post('/login', controller.login);



router.get('/customers', authentication, authorization.Admins, controller.getAll);


module.exports = router;

