const Router = require('express')
const router = new Router
const boquetController = require('../controllers/boquetController')
const flowerController = require('../controllers/flowerController')

router.post('/',boquetController.create)
router.get('/',boquetController.getALL)
router.get('/:id',flowerController.getOne)//отдельный букет или цвееток


module.exports = router