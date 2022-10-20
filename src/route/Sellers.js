const router = require('express').Router();
const controller = require('../controller/Sellers');
const multer = require('../../config/multer');
const { authentication, authorization } = require('../../middleware/auth');

router.post('/register', multer.single('photo'), controller.register);
router.post('/login', controller.login);
router.get('/sellers', authentication, authorization.Admins, controller.getAll)

module.exports = router;