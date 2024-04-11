const db = require('../db')

class FlowerController {
	async createFlower(req, res) {
		const { id, name, count, price, season_start, season_end, img } = req.body
		let flower
		if (id) {
			flower = await db.query('UPDATE flowers set name = ($1), img = ($2) where id = ($3) RETURNING *', [name, img,id])
		} else {
			flower = await db.query('INSERT INTO flowers(name, img) values ($1, $2) RETURNING *', [name, img])
		}
		res.json(flower.rows[0])
	}
	async getFlowers(req, res) {
		const flower = await db.query('SELECT * FROM flowers ORDER BY id')
		res.json(flower.rows)
	}
	async getOneFlower(req, res) {
		const id = req.params.id
		const flower = await db.query('SELECT * FROM flowers WHERE id = ($1)',[id])
		//console.log(id+'flower')
		res.json(flower.rows[0])
	}
	async deleteFlower(req, res) {
		const id = req.params.id
		const flower = await db.query('DELETE FROM flowers WHERE id = ($1)',[id])
		res.json({ success: true })
	}
}

module.exports = new FlowerController()
