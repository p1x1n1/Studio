const Router = require('express')
const router = new Router
const selectedController = require('../controllers/selected.controller')
router.post('/',selectedController.createSelected)
router.get('/:login',selectedController.getSelected)
router.get('/:login/:arc', selectedController.getOneSelectedBouquet)
router.delete('/:login', selectedController.deleteSelected)
router.delete('/:login/:arc', selectedController.deleteOneSelected)

module.exports = router