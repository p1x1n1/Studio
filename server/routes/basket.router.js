const Router = require('express')
const router = new Router
const basketRouter = require('../controllers/basket.controller')
router.post('/',basketRouter.createBasket)
router.post('/:arc',basketRouter.updateBasket)
router.get('/:login',basketRouter.getBasket)
router.get('/:arc', basketRouter.getOneBasketBouquet)
router.delete('/:login', basketRouter.deleteBasket)
router.delete('/:login/:arc', basketRouter.deleteOneBasket)

module.exports = router