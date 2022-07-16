const router = require('express').Router();
const userController = require('../controller/Users');

router.post('/register', userController.register);
router.get('/users', userController.getAll);
router.put('/password', userController.updatePassword);
router.post('/login', userController.login);

module.exports = router;
