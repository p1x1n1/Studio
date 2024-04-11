const Router = require('express')
const router = new Router()
const bouquetCompositionController = require('../controllers/bouquet.composition.controller')

router.post('/create', bouquetCompositionController.createBouquetComposition)
router.get('/update/', bouquetCompositionController.getBouquetCompositions)
router.get('/:arc_bouquets', bouquetCompositionController.getOneBouquetComposition)
router.get('/:arc_bouquets/:id_type_flowers', bouquetCompositionController.getOneBouquetComposition)
router.delete('/:arc_bouquets', bouquetCompositionController.deleteBouquetComposition)
router.delete('/:arc_bouquets/:id_type_flowers', bouquetCompositionController.deleteBouquetFlowerComposition)

module.exports = router