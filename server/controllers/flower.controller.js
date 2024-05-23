const uuid = require('uuid');
const db = require('../db.pool')
const path = require('path');
const { Flower } = require('../models/models')

class FlowerController {
	async createFlower(req, res) {
		const { id_record, title,  price, cnt, season_start, season_end} = req.body
		console.log(req.body,req.files)
		
		let flower
		if (id_record) {
			if (req.files){
				let {img} = req.files
				let fileName = uuid.v4()+".jpg";
				img.mv(path.resolve(__dirname,'..','static',fileName));
				flower = await db.query('UPDATE flowers set title = ($1),cnt = ($2), price = ($3), season_start = ($4), season_end = ($5), img = ($6) where id_record = ($7) RETURNING *', [title, cnt, price, season_start, season_end, fileName ,id_record])
			}
			else{
				flower = await db.query('UPDATE flowers set title = ($1),cnt = ($2), price = ($3), season_start = ($4), season_end = ($5) where id_record = ($6) RETURNING *', [title, cnt, price, season_start, season_end, id_record])
			}
		} else {
			if (req.files){
				let {img} = req.files
				let fileName = uuid.v4()+".jpg";
				img.mv(path.resolve(__dirname,'..','static',fileName));
				flower = await db.query('INSERT INTO flowers(title, cnt, price, season_start, season_end, img ) values ($1, $2,$3,$4,$5,$6) RETURNING *', [title, cnt, price, season_start, season_end, fileName ])
			}
			else  flower = await db.query('INSERT INTO flowers(title, cnt, price, season_start, season_end) values ($1, $2,$3,$4,$5) RETURNING *', [title, cnt, price, season_start, season_end ])
		}
		return res.json(flower.rows[0])
	}
	async getFlowers(req, res) {
		//flower = await Flower.findAll()
		//res.json(flower)
		const flower = await db.query('SELECT * FROM flowers where flowers.cnt > 0 ORDER BY id_record')
		console.log((flower.rows))
		res.json(flower.rows)
	}
	async getFlowersAll(req, res) {
		const flower = await db.query('SELECT * FROM flowers ORDER BY id_record')
		res.json(flower.rows)
	}
	async getOneFlower(req, res) {
		const id_record = req.params.id_record
		const flower = await db.query('SELECT * FROM flowers WHERE id_record = ($1)',[id_record])
		//console.log(id_record+'flower')
		res.json(flower.rows[0])
	}
	async deleteOneFlower(req, res) {
		const id_record = req.params.id_record
		const flower = await db.query('DELETE FROM flowers WHERE id_record = ($1)',[id_record])
		res.json({ success: true })
	}
}

module.exports = new FlowerController()
