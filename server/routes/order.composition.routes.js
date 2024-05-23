const Router = require('express')
const router = new Router()
const orderCompositionController = require('../controllers/order.composition.controller')

router.post('/create', orderCompositionController.createOrderComposition)
router.get('/:orderNumberOrder', orderCompositionController.getOrderComposition)
router.get('/admin/sales/:start_date/:end_date', orderCompositionController.getAdminSales)
router.delete('/:arc_orders', orderCompositionController.deleteOrderComposition)
router.delete('/:arc_orders/:id_type_flowers', orderCompositionController.deleteOrderFlowerComposition)

module.exports = router