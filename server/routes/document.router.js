const Router = require('express')
const documentController = require('../controllers/document.controller')
const router = new Router

router.post('/user',documentController.createUserCheck)
router.post('/admin/sales',documentController.createAdminSales)
router.post('/',documentController.create)
router.get('/sales',documentController.getSales)
router.get('/',documentController.getOne)
// router.get('/:id_record',documentController.getOne)
// router.delete('/:id_record',documentController.deleteOne)

module.exports = router