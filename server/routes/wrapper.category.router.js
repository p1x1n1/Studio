const Router = require('express')
const categoryController = require('../controllers/wrapper.category.сontroller')

const router = new Router

router.post('/',categoryController.create)
router.get('/',categoryController.getALL)
router.get('/:id',categoryController.getOne)
router.delete('/:id',categoryController.deleteOne)

module.exports = router