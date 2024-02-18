const Router = require('express')
const flowerController = require('../controllers/flowerController')
const router = new Router

router.post('/',flowerController.create)
router.get('/',flowerController.getALL)
router.get('/:id',flowerController.getOne)//отдельный букет или цвееток

module.exports = router