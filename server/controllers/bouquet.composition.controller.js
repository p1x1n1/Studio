const db = require('../db')

class BouquetCompositionController {
	async createBouquetComposition(req, res) {
		const { bouquetArc, flowerId,count_ } = req.body
		let bouquet
		bouquet = await db.query('INSERT INTO composition_bouquets (arc_bouquets,id_type_flowers,count_) values ($1, $2,$3) RETURNING *', [ arc_bouquets ,id_type_flowers,count_])
		res.json(bouquet.rows[0])
	}
	async updateBouquetComposition(req, res) {
		const { arc_bouquets, id_type_flowers,count_ } = req.body
		let bouquet
		bouquet = await db.query('UPDATE composition_bouquets set count_ = ($1) where arc_bouquets = ($2) and id_type_flowers = ($3)  RETURNING *', [count_, arc_bouquets ,id_type_flowers])
		res.json(bouquet.rows[0])
	}
	async getBouquetCompositions(req, res) {
		const bouquet = await db.query('SELECT arc_bouquets,id_type_flowers, flowers.name_type as flower_name FROM composition_bouquets INNER JOIN flowers on flowers.id_type=composition_bouquets.id_type_flowers ORDER BY arc_bouquets,id_type_flowers ')
		res.json(bouquet.rows)
	}
	async getOneBouquetComposition(req, res) {
		const arc_bouquets = req.params.arc_bouquets
		const bouquet = await db.query('SELECT arc_bouquets,id_type_flowers, flowers.name_type as flower_name FROM composition_bouquets INNER JOIN flowers on flowers.id_type=composition_bouquets.id_type_flowers WHERE arc_bouquets = ($1)',[arc_bouquets])
		res.json(bouquet.rows)
	}
	async getOneBouquetFlowerComposition(req, res) {
		const arc_bouquets = req.params.arc_bouquets
		const id_type_flowers = req.params.id_type_flowers
		const bouquet = await db.query('SELECT * FROM composition_bouquets WHERE arc_bouquets = ($1) and id_type_flowers = ($2)',[arc_bouquets,id_type_flowers])
		res.json(bouquet.rows[0])
	}
	async deleteBouquetComposition(req, res) {
		const arc_bouquets = req.params.arc_bouquets
		const bouquet = await db.query('DELETE FROM composition_bouquets WHERE arc_bouquets = ($1)',[arc_bouquets])
		res.json({ success: true })
	}
	async deleteBouquetFlowerComposition(req, res) {
		const arc_bouquets = req.params.arc_bouquets
		const id_type_flowers = req.params.id_type_flowers
		const bouquet = await db.query('DELETE FROM composition_bouquets WHERE arc_bouquets = ($1) and id_type_flowers = ($2)',[arc_bouquets,id_type_flowers])
		res.json({ success: true })
	}
}

module.exports = new BouquetCompositionController()
