const Router = require('express')
const router = new Router
const OrderController = require('../controllers/order.сontroller')

router.post('/',OrderController.create)
router.get('/',OrderController.getALL)
router.get('/:employee/0',OrderController.getALL)
router.get('/:employee/:login/0',OrderController.getALL)
router.get('/admin/:status',OrderController.getAdmin)
router.get('/user/:login',OrderController.getUser)
router.get('/florist/:login/:status',OrderController.getFlorist)
router.get('/courier/:login/:status',OrderController.getCourier)
router.get('/:number_order',OrderController.getOne)
router.get('/admin/sales/:start_date/:end_date',OrderController.getAllSum)
module.exports = router