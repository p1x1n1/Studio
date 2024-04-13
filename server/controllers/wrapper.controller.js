const db = require('../db')

class WrapperController {
	async createWrapper(req, res) {
		const { id, title, img } = req.body
		let wrapper
		if (id) {
			wrapper = await db.query('UPDATE wrappers set title = ($1), img = ($2) where id = ($3) RETURNING *', [title, img,id])
		} else {
			wrapper = await db.query('INSERT INTO wrappers (title, img) values ($1, $2) RETURNING *', [title, img])
		}
		res.json(wrapper.rows[0])
	}
	async getWrappers(req, res) {
		const wrapper = await db.query('SELECT * FROM wrappers ORDER BY id')
		res.json(wrapper.rows)
	}
	async getOneWrapper(req, res) {
		const id = req.params.id
		const wrapper = await db.query('SELECT * FROM wrappers WHERE id = ($1)',[id])
		res.json(wrapper.rows[0])
	}
	async deleteWrapper(req, res) {
		const id = req.params.id
		const wrapper = await db.query('DELETE FROM wrappers WHERE id = ($1)',[id])
		res.json({ success: true })
	}
}

module.exports = new WrapperController()
