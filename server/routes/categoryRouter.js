const Router = require('express')
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',categoryController.create)//для создания только от админа добавить в букеты и тд
router.get('/',categoryController.getALL)
router.get('/:id',categoryController.getOne)//отдельный букет или цвееток
router.delete('/:id',categoryController.deleteOne)

module.exports = router