const router = require('express').Router();
const orderController = require('../controllers/orders.controller');


router.post('/:id', orderController.createOrder);
router.get('/', orderController.getAllorder);
router.get('/', orderController.getOrder);
router.put('/', orderController.updateorder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;