
const db = require('../db.pool')
class BouquetCompositionController {
	async createBouquetComposition(req, res) {
		const { bouquetArc, flowerIdRecord,cnt } = req.body
		let bouquet
		bouquet = await db.query('INSERT INTO composition_bouquets (bouquetArc,flowerIdRecord,cnt) values ($1, $2,$3) RETURNING *', [ bouquetArc ,flowerIdRecord,cnt])
		res.json(bouquet.rows[0])
	}
	async updateBouquetComposition(req, res) {
		const { bouquetArc, flowerIdRecord,cnt } = req.body
		let bouquet
		bouquet = await db.query('UPDATE composition_bouquets set cnt = ($1) where bouquetArc = ($2) and flowerIdRecord = ($3)  RETURNING *', [cnt, bouquetArc ,flowerIdRecord])
		res.json(bouquet.rows[0])
	}
	async getBouquetCompositions(req, res) {
		const bouquet = await db.query('SELECT bouquetArc,flowerIdRecord, flowers.name_type as flower_name FROM composition_bouquets INNER JOIN flowers on flowers.id_type=composition_bouquets.flowerIdRecord ORDER BY bouquetArc,flowerIdRecord ')
		res.json(bouquet.rows)
	}
	async getOneBouquetComposition(req, res) {
		const bouquetArc = req.params.bouquetArc
		const bouquet = await db.query('SELECT bouquetArc,flowerIdRecord, flowers.name_type as flower_name FROM composition_bouquets INNER JOIN flowers on flowers.id_type=composition_bouquets.flowerIdRecord WHERE bouquetArc = ($1)',[bouquetArc])
		res.json(bouquet.rows)
	}
	async getOneBouquetFlowerComposition(req, res) {
		const bouquetArc = req.params.bouquetArc
		const flowerIdRecord = req.params.flowerIdRecord
		const bouquet = await db.query('SELECT * FROM composition_bouquets WHERE bouquetArc = ($1) and flowerIdRecord = ($2)',[bouquetArc,flowerIdRecord])
		res.json(bouquet.rows[0])
	}
	async deleteBouquetComposition(req, res) {
		const bouquetArc = req.params.bouquetArc
		const bouquet = await db.query('DELETE FROM composition_bouquets WHERE bouquetArc = ($1)',[bouquetArc])
		res.json({ success: true })
	}
	async deleteBouquetFlowerComposition(req, res) {
		const bouquetArc = req.params.bouquetArc
		const flowerIdRecord = req.params.flowerIdRecord
		const bouquet = await db.query('DELETE FROM composition_bouquets WHERE bouquetArc = ($1) and flowerIdRecord = ($2)',[bouquetArc,flowerIdRecord])
		res.json({ success: true })
	}
}

module.exports = new BouquetCompositionController()
