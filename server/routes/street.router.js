const Router = require('express')
const streetController = require('../controllers/street.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',streetController.create)//для создания только от админа добавить в букеты и тд
router.get('/',streetController.getALL)
router.get('/:id_record',streetController.getOne)//отдельный букет или цвееток

module.exports = router