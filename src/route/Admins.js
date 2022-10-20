const router = require('express').Router();
const multer = require('../../config/multer');
const controller = require('../controller/Admins');
const { authentication, authorization} = require('../../middleware/auth');

router.post('/register', multer.single('profile') , controller.register);
router.post('/login', controller.login);
router.get('/admins', authentication, authorization.Admins , controller.getAll);


module.exports = router;
