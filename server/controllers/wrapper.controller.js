const uuid = require('uuid');
const db = require('../db.pool')
const path = require('path');
const ApiError = require('../error/ApiError');

class WrapperController {
	async createWrapper(req, res) {
		let { id_record, title, price,cnt, wrapperCategoryIdRecord} = req.body
		console.log('body',req.body)
		let {img} = req.files
		price = parseFloat(price);
		let wrapper
		if (id_record) {
			if (img){
				let fileName = uuid.v4()+".jpg";
				img.mv(path.resolve(__dirname,'..','static',fileName));
				wrapper = await db.query('UPDATE wrappers set title = ($1),cnt = ($2), price = ($3),  img = ($4), "wrapperCategoryIdRecord"=($5) where id_record = ($6) RETURNING *', [title, price,cnt ,fileName,wrapperCategoryIdRecord,id_record])
			}
			else{
				wrapper = await db.query('UPDATE wrappers set title = ($1),cnt = ($2), price = ($3),  "wrapperCategoryIdRecord"=($4) where id_record = ($5) RETURNING *', [title, price,cnt ,wrapperCategoryIdRecord,id_record])
			}
		} else {
			let fileName = uuid.v4()+".jpg";
			img.mv(path.resolve(__dirname,'..','static',fileName));
			wrapper = await db.query('INSERT INTO wrappers (title, price,cnt ,img) values ($1, $2,$3,$4) RETURNING *', [title, price,cnt ,fileName])
		}
		res.json(wrapper.rows[0])
	}
	async getWrappers(req, res) {
		const wrapper = await db.query('SELECT * FROM wrappers where wrappers.cnt > 0 ORDER BY id_record')
		console.log(wrapper)
		res.json(wrapper.rows)
	}
	async getWrappersAll(req, res) {
		const wrapper = await db.query(
			`
			SELECT wrappers.id_record, wrappers.title,cnt, img, price, "wrapperCategoryIdRecord",wrapper_categories.title as category_title  FROM wrappers
			inner join wrapper_categories on wrapper_categories.id_record = wrappers."wrapperCategoryIdRecord"
			ORDER BY cnt
			`
		)
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
