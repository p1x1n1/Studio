const db = require('../db.pool')
const { Selected } = require('../models/models')

class SelectedController {
	async createSelected(req, res) {
		const { login, arc } = req.body
		console.log('selected',login,arc)
		let selected
		selected = await db.query('INSERT INTO selecteds("userLogin", "bouquetArc" ) values ($1, $2) RETURNING *', [ login, arc ])
		res.json(selected.rows[0])
	}
	async getSelected(req, res) {
		const userLogin = req.params.login
		const selected = await db.query(
			`
			SELECT * FROM selecteds 
			inner join bouquets on bouquets.arc = selecteds."bouquetArc"
			where selecteds."userLogin" = ($1) ORDER BY "bouquetArc";
			`
			,[userLogin])
		console.log('selected',selected.rows,userLogin)
		res.json(selected.rows)
	}
	async getOneSelectedBouquet(req, res) {
		const login = req.params.login
		const selected = await db.query('SELECT * FROM selecteds WHERE id_record = ($1)',[id_record])
		//console.log(id_record+'flower')
		res.json(selected.rows[0])
	}
	async deleteSelected(req, res) {
		const userLogin = req.params.login
		const selected = await db.query('DELETE FROM selecteds WHERE "userLogin" = ($1)',[userLogin])
		res.json({ success: true })
	}
	async deleteOneSelected(req, res) {
		console.log('delete one selected',req.params)
		const userLogin = req.params.login
		const boquetArc = req.params.login.arc
		const selected = await db.query('DELETE FROM selecteds WHERE "userLogin" = ($1)',[userLogin])
		res.json({ success: true })
	}
}

module.exports = new SelectedController()
