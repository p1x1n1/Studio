const Router = require('express')
const router = new Router()
const WrapperController = require('../controllers/wrapper.controller')

router.post('/', WrapperController.createWrapper)
router.get('/', WrapperController.getWrappers)
router.get('/:id_type', WrapperController.getOneWrapper)
router.delete('/:id_type', WrapperController.deleteWrapper)

module.exports = router
