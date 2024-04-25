const Router = require('express')
const localityController = require('../controllers/locality.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',localityController.create)//для создания только от админа добавить в букеты и тд
router.get('/',localityController.getALL)
router.get('/:id_record',localityController.getOne)//отдельный букет или цвееток

module.exports = router