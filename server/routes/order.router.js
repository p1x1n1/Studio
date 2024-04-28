const Router = require('express')
const router = new Router
const OrderController = require('../controllers/order.сontroller')

router.post('/',OrderController.create)
router.get('/',OrderController.getALL)
router.get('/admin',OrderController.getAdmin)
router.get('/florist',OrderController.getFlorist)
router.get('/:number_order',OrderController.getOne)//отдельный букет или цвееток

module.exports = router