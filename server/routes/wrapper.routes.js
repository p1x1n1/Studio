const Router = require('express')
const router = new Router()
const WrapperController = require('../controllers/wrapper.controller')

router.post('/', WrapperController.createWrapper)
router.get('/', WrapperController.getWrappers)
router.get('/:id_record', WrapperController.getOneWrapper)
router.delete('/:id_record', WrapperController.deleteWrapper)

module.exports = router
