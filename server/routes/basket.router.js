const Router = require('express')
const router = new Router
const basketController = require('../controllers/basket.controller')

router.post('/',basketController.createBasket)
router.post('/:arc',basketController.updateBasket)
router.get('/:login',basketController.getBasket)
router.get('/:login/:arc', basketController.getOneBasketBouquet)
router.delete('/:login', basketController.deleteBasket)
router.delete('/:login/:arc', basketController.deleteOneBasket)

module.exports = router