const router = require('express').Router();
const controller = require('../controller/Items');
const { authentication, authorization } = require('../../middleware/auth');
const multer = require('../../config/multer');

router.use(authentication)

router.post('/addItem', authorization.Sellers, multer.array('photo'), controller.addItem);
router.get('/items', authorization.Sellers, controller.getAll);
router.get('/items/:id', authorization.Sellers, controller.getByID);
router.put('/items/:id', authorization.Sellers, controller.updateItems);
router.put('/items/delete/:id', authorization.Sellers, controller.statusItem);

module.exports = router; 