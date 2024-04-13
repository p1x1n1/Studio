const { Bouquet } = require("../models/models")
const db = require('../db.pool')
class BouquetController {
	async createBouquet(req, res) {
		const { arc, title,ready_made,price,wrapperId, description, img } = req.body
		let bouquet
		if (arc) {
			bouquet = await db.query('UPDATE bouquets set title = ($1),wrapperId = ($2) , description ,img = ($4) where arc = ($4) RETURNING *', [title, wrapperId,description,img,arc])
		} else {
			bouquet = await db.query('INSERT INTO bouquets (title,ready_made,price,wrapperId,description,img) values ($1, $2,$3,$4,$5) RETURNING *', [title, ready_made,price,wrapperId,description, img])
		}
		res.json(bouquet.rows[0])
	}
	async getBouquets(req, res) {
		const bouquet = await db.query('SELECT * FROM bouquets ORDER BY arc')
		res.json(bouquet.rows)
	}
	async getBouquetsInfo(req, res) {
		const bouquet = await db.query('select *, wrappers.title as wrapper_name from bouquets inner join wrappers on bouquets."wrapperId" = wrappers.id order by arc')
		res.json(bouquet.rows)
	}
	async getOneBouquet(req, res) {
		const arc = req.params.arc
		const bouquet = await db.query('SELECT * FROM bouquets WHERE arc = ($1)',[arc])
		res.json(bouquet.rows[0])
	}
	async deleteBouquet(req, res) {
		const arc = req.params.arc
		const bouquet = await db.query('DELETE FROM bouquets WHERE arc = ($1)',[arc])
		res.json({ success: true })
	}
}

module.exports = new BouquetController()