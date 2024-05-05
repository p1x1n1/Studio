const { User } = require("../models/models")
const db = require('../db.pool')
class userController {
	async createUser(req, res) {
		const { login,email, phone, name_,surname,lastname,avatar } = req.body
		let user
		user = await db.query('INSERT INTO users (login,email, phone, name_,surname,lastname,avatar ) values ($1, $2,$3,$4,$5,$6,$7) RETURNING *', 
        [login,email, phone, name_,surname,lastname,avatar ])
		res.json(user.rows[0])
	}
    async updateUser(req, res) {
		const { login,email, phone, name_,surname,lastname,avatar } = req.body
		let user
		user = await db.query('UPDATE users set name_ = ($1),surname = ($2) , lastname = ($3), avatar=($4),  phone = ($5)  where login = ($6) RETURNING *',
         [name_,surname,lastname,avatar, phone,login]);
		res.json(user.rows[0])
	}
	async getUser(req, res) {
		const user = await db.query(`
        SELECT * FROM users
        inner join discounts on discounts.id_record = users."discountIdRecord";
        `)
		res.json(user.rows)
	}
	async getOneUser(req, res) {
		const login = req.params.login
		const user = await db.query(`SELECT * FROM users  SELECT * FROM users
        inner join discounts on discounts.id_record = users."discountIdRecord" WHERE login = ($1)`,[login])
        user.password_=undefined;
		res.json(user.rows[0])
	}
	async deleteUser(req, res) {
		const login = req.params.login
		const user = await db.query('DELETE FROM users WHERE login = ($1)',[login])
		res.json({ success: true })
	}
}

module.exports = new userController()