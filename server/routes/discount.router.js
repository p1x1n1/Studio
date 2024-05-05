const Router = require('express')
const categoryController = require('../controllers/discount.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router

router.post('/',categoryController.create)
router.get('/',categoryController.getALL)
router.get('/:id_record',categoryController.getOne)
router.delete('/:id_record',categoryController.deleteOne)

module.exports = router