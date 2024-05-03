const Router = require('express')
const router = new Router()
const bouquetCompositionController = require('../controllers/bouquet.composition.controller')

router.post('/:bouquetArc', bouquetCompositionController.createBouquetComposition)
router.get('/update/', bouquetCompositionController.getBouquetComposition)
router.get('/:bouquetArc', bouquetCompositionController.getBouquetComposition)
router.get('/:bouquetArc/:flowerIdRecord', bouquetCompositionController.getOneBouquetComposition)
router.delete('/:bouquetArc', bouquetCompositionController.deleteBouquetComposition)
router.delete('/:bouquetArc/:flowerIdRecord', bouquetCompositionController.deleteBouquetFlowerComposition)

module.exports = router