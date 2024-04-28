const { Employee } = require("../models/models")
const db = require('../db.pool')
class employeeController {
	async createEmployee(req, res) {
		const { login,email, phone, name_,surname,lastname,avatar, postIdRecord } = req.body
		let employee
		employee = await db.query('INSERT INTO employees (login,email, phone, name_,surname,lastname,avatar, "postIdRecord" ) values ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *', 
        [login,email, phone, name_,surname,lastname,avatar, postIdRecord ])
		res.json(employee.rows[0])
	}
    async updateEmployee(req, res) {
		const { login,email, phone, name_,surname,lastname,avatar, postIdRecord } = req.body
		let employee
		employee = await db.query('UPDATE employees set name_ = ($1),surname = ($2) , lastname = ($3), avatar=($4), "postIdRecord" = ($5), phone = ($6)  where login = ($7) RETURNING *',
         [name_,surname,lastname,avatar, postIdRecord,phone,login]);
		res.json(employee.rows[0])
	}
	async getEmployee(req, res) {
		const employee = await db.query(`
        SELECT * FROM employees
        inner join posts on posts.id_record = employees."postIdRecord";
        `)
        employee.password_=undefined;
		res.json(employee.rows)
	}
	async getFlorist(req, res) {//переписать без ps
		const employee = await db.query(`
        SELECT * FROM employees
		where employees."postIdRecord" = 2;
        `)
        employee.password_=undefined;
		res.json(employee.rows)
	}
	async getCourier(req, res) {//переписать без ps
		const employee = await db.query(`
        SELECT * FROM employees
		where employees."postIdRecord" = 3;
        `)
        employee.password_=undefined;
		res.json(employee.rows)
	}
	async getOneEmployee(req, res) {
		const login = req.params.login
		const employee = await db.query('SELECT * FROM employees WHERE login = ($1)',[login])
        employee.password_=undefined;
        res.json(employee.rows[0])
	}
	async deleteEmployee(req, res) {
		const login = req.params.login
		const employee = await db.query('DELETE FROM employees WHERE login = ($1)',[login])
		res.json({ success: true })
	}
}

module.exports = new employeeController()