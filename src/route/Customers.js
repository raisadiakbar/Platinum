const router = require('express').Router();
const controller = require('../controller/Customers');

router.post('/customers', controller.addCustomer);
router.get('/customers', controller.getAll);
router.get('/customers/:id', controller.getByID);
router.put('/customers', controller.updateCustomer);
router.delete('/customers', controller.deleteCustomer);

module.exports = router;
