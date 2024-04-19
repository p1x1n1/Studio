const db = require('../db.pool')

class WrapperController {
	async createWrapper(req, res) {
		const { id_record, title, price,cnt ,img } = req.body
		let wrapper
		if (id_record) {
			wrapper = await db.query('UPDATE wrappers set title = ($1),cnt = ($2), price = ($3),  img = ($4) where id_record = ($5) RETURNING *', [title, price,cnt ,img,id_record])
		} else {
			wrapper = await db.query('INSERT INTO wrappers (title, price,cnt ,img) values ($1, $2,$3,$4) RETURNING *', [title, price,cnt ,img])
		}
		res.json(wrapper.rows[0])
	}
	async getWrappers(req, res) {
		const wrapper = await db.query('SELECT * FROM wrappers where wrappers.cnt > 0 ORDER BY id_record')
		console.log(wrapper)
		res.json(wrapper.rows)
	}
	async getWrappersAll(req, res) {
		const wrapper = await db.query('SELECT * FROM wrappers ORDER BY id_record')
		res.json(wrapper.rows)
	}
	async getOneWrapper(req, res) {
		const id_record = req.params.id_record
		const wrapper = await db.query('SELECT * FROM wrappers WHERE id_record = ($1)',[id_record])
		res.json(wrapper.rows[0])
	}
	async deleteWrapper(req, res) {
		const id_record = req.params.id_record
		const wrapper = await db.query('DELETE FROM wrappers WHERE id_record = ($1)',[id_record])
		res.json({ success: true })
	}
}

module.exports = new WrapperController()
