const Router = require('express')
const router = new Router()
const bouquetCompositionController = require('../controllers/categories.bouquet.controller')

router.post('/:bouquetArc', bouquetCompositionController.createCategoryBouquet)
router.get('/:bouquetArc', bouquetCompositionController.getBouquetCategory)
router.get('/:bouquetArc/:category', bouquetCompositionController.getOneBouquetCategory)
router.delete('/:bouquetArc', bouquetCompositionController.deleteBouquetCategory)

module.exports = router