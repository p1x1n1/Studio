const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const flowerController = require('../controllers/flower.controller')

router.post('/', flowerController.createFlower)
router.get('/', flowerController.getFlowers)
router.get('/:id_record', flowerController.getOneFlower)
router.delete('/:id_record', flowerController.deleteOneFlower)

module.exports = router
