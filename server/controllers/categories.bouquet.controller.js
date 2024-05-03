const db = require('../db.pool')

class CategoryBouquetController {
	async createCategoryBouquet(req, res) {
		console.log('CreateBouquetCategory');
		const {categoryIdRecord } = req.body
		const bouquetArc = req.params.bouquetArc
		console.log(req.params)
		let bouquet
		bouquet = await db.query('INSERT INTO bouquet_categories ("bouquetArc","categoryIdRecord") values ($1, $2) RETURNING *', [ bouquetArc ,categoryIdRecord])
		res.json(bouquet.rows[0])
	}
	async getBouquetCategory(req, res) {
		const bouquetArc = req.params.bouquetArc
		const bouquet = await db.query(`
		SELECT "categoryIdRecord","categoryIdRecord", categories.title as categories_name
		FROM bouquet_categories INNER JOIN categories on categories.id_record = bouquet_categories."categoryIdRecord" 
		WHERE "bouquetArc" = ($1) ORDER BY "categoryIdRecord";
		 `
		,[bouquetArc])
		res.json(bouquet.rows)
	}
	async getOneBouquetCategory(req, res) {//to do
		const bouquetArc = req.params.bouquetArc
		const bouquet = await db.query('SELECT bouquetArc,flowerIdRecord, flowers.title as flower_name FROM composition_bouquets INNER JOIN flowers on flowers.id_type=composition_bouquets.flowerIdRecord WHERE bouquetArc = ($1)',[bouquetArc])
		res.json(bouquet.rows)
	}
	async deleteBouquetCategory(req, res) {
		console.log('deleteBouquetCategory');
		const bouquetArc = req.params.bouquetArc
		const bouquet = await db.query('DELETE FROM bouquet_categories WHERE "bouquetArc" = ($1)',[bouquetArc])
		res.json({ success: true })
	}
}

module.exports = new CategoryBouquetController()
