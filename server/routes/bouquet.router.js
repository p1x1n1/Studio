const Router = require('express')
const router = new Router
const bouquetController = require('../controllers/bouquet.сontroller')
const flowerController = require('../controllers/flowerController')

router.post('/',bouquetController.createBouquet)
router.get('/',bouquetController.getBouquetsInfo)
router.get('/category/:id_category/:flowers/:start_end',bouquetController.getBouquetsCategory)
router.get('/:arc', bouquetController.getOneBouquet)
router.delete('/:arc', bouquetController.deleteBouquet)

module.exports = router