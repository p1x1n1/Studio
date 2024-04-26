const Router = require('express')
const router = new Router()
const orderCompositionController = require('../controllers/order.composition.controller')

router.post('/create', orderCompositionController.createOrderComposition)
router.get('/update/', orderCompositionController.getOrderCompositions)
router.get('/:arc_orders', orderCompositionController.getOneOrderComposition)
router.get('/:arc_orders/:id_type_flowers', orderCompositionController.getOneOrderComposition)
router.delete('/:arc_orders', orderCompositionController.deleteOrderComposition)
router.delete('/:arc_orders/:id_type_flowers', orderCompositionController.deleteOrderFlowerComposition)

module.exports = router