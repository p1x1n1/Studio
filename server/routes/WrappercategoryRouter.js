const Router = require('express')
const categoryController = require('../controllers/WrappercategoryController')

const router = new Router

router.post('/',categoryController.create)
router.get('/',categoryController.getALL)
router.get('/:id',categoryController.getOne)

module.exports = router