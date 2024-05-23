const db = require('../db.pool')
const { Basket } = require('../models/models')

class BasketController {
	async createBasket(req, res) {
		const { login, arc, cnt } = req.body
		console.log(login,arc,cnt)
		let basket
		basket = await db.query('INSERT INTO baskets("userLogin", "bouquetArc" ,cnt ) values ($1, $2,$3) RETURNING *', [ login, arc, cnt ])
		res.json(basket.rows[0])
	}
	async updateBasket(req, res) {
		const { userLogin, boquetArc, cnt } = req.body
		console.log(req.body)
		let basket
		basket = await db.query('UPDATE baskets set cnt = ($3) where "userLogin" = ($1) and "bouquetArc" = ($2)  RETURNING *', [userLogin, boquetArc, cnt])
		res.json(basket.rows[0])
	}
	async getBasket(req, res) {
		const userLogin = req.params.login
		const basket = await db.query(
			`
			SELECT * FROM baskets 
			inner join bouquets on bouquets.arc = baskets."bouquetArc"
			where baskets."userLogin" = ($1) ORDER BY "bouquetArc";
			`
			,[userLogin])
		console.log('basket',basket.rows,userLogin)
		res.json(basket.rows)
	}

	async getOneBasketBouquet(req, res) {
		const login = req.params.login
		const arc = req.params.arc
		console.log('req',req.params)
		const basket = await db.query('SELECT * FROM baskets WHERE "userLogin" = ($1) and "bouquetArc"=($2)',[login,arc])
		res.json(basket.rows[0])
	}
	async deleteBasket(req, res) {
		const userLogin = req.params.login
		const basket = await db.query('DELETE FROM baskets WHERE "userLogin" = ($1)',[userLogin])
		res.json({ success: true })
	}
	async deleteOneBasket(req, res) {
		const userLogin = req.params.login
		const arc = req.params.arc
		const basket = await db.query('DELETE FROM baskets WHERE "userLogin" = ($1) and "bouquetArc"=($2)',[userLogin,arc])
		res.json({ success: true })
	}
}

module.exports = new BasketController()
