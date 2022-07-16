const controller = require('../controller/Orders');
const router = require('express').Router();

router.get('/orders', controller.getAll);
router.post('/addOrders', controller.addOrder);
router.get('/orders/:id', controller.getOrderById);
router.put('/orders/:id', controller.updateOrder);
router.delete('/orders/:id', controller.deleteOrder);


module.exports = router;