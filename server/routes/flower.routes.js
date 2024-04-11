const Router = require('express')
const router = new Router()
const flowerController = require('../controllers/flower.controller')

router.post('/', flowerController.createFlower)
router.get('/', flowerController.getFlowers)
router.get('/:id', flowerController.getOneFlower)
router.delete('/:id', flowerController.deleteFlower)

module.exports = router
