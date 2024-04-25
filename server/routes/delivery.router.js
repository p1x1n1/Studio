const Router = require('express')
const deliveryController = require('../controllers/delivery.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',deliveryController.create)//для создания только от админа добавить в букеты и тд
router.get('/',deliveryController.getALL)
router.get('/:id_record',deliveryController.getOne)//отдельный букет или цвееток

module.exports = router