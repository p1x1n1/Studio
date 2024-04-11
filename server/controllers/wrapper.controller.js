const db = require('../db')

class WrapperController {
	async createWrapper(req, res) {
		const { id_type, name_type, img } = req.body
		let wrapper
		if (id_type) {
			wrapper = await db.query('UPDATE wrappers set name_type = ($1), img = ($2) where id_type = ($3) RETURNING *', [name_type, img,id_type])
		} else {
			wrapper = await db.query('INSERT INTO wrappers (name_type, img) values ($1, $2) RETURNING *', [name_type, img])
		}
		res.json(wrapper.rows[0])
	}
	async getWrappers(req, res) {
		const wrapper = await db.query('SELECT * FROM wrappers ORDER BY id_type')
		res.json(wrapper.rows)
	}
	async getOneWrapper(req, res) {
		const id_type = req.params.id_type
		const wrapper = await db.query('SELECT * FROM wrappers WHERE id_type = ($1)',[id_type])
		res.json(wrapper.rows[0])
	}
	async deleteWrapper(req, res) {
		const id_type = req.params.id_type
		const wrapper = await db.query('DELETE FROM wrappers WHERE id_type = ($1)',[id_type])
		res.json({ success: true })
	}
}

module.exports = new WrapperController()
