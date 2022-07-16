const router = require('express').Router();
const controller = require ('../controller/Items');

router.post('/items', controller.addItem);
router.get('/items', controller.getAll);
router.get('/items/:id', controller.getByID);
router.put('/items/:id', controller.updateItems);
router.delete('/items/:id', controller.deleteItem);

module.exports = router; 