const Router = require('express')
const postController = require('../controllers/post.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',postController.create)//для создания только от админа добавить в букеты и тд
router.get('/',postController.getALL)
router.get('/:id_record',postController.getOne)//отдельный букет или цвееток

module.exports = router