const { Order } = require("../models/models")
const db = require('../db.pool')

class OrderController{
    async create (req,res){
        const {number_order, statusOrderIdRecord, typeOrderIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, data_order, time_order, anonymized, comment_, price, userLogin, employeeLogin, courierLogin, floristLogin } = req.body
		let order
		if (number_order) {
			order = await db.query('UPDATE orders set statusOrderIdRecord = ($1),employeeLogin  = ($2), courierLogin  = ($3), floristLogin  = ($4) where number_order = ($5) RETURNING *', [,statusOrderIdRecordRecord,employeeLogin, courierLogin, floristLogin,number_order])
		} else {
			order = await db.query('INSERT INTO orders (statusOrderIdRecord, typeOrderIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, data_order, time_order, anonymized, comment_, price, userLogin) values ($1, $2,$3,$4,$5,$6,$7,$8,$9,&10,$11,$12) RETURNING *', [statusOrderIdRecord, typeOrderIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, data_order, time_order, anonymized, comment_, price, userLogin])
		}
		res.json(order.rows[0])
    }

    async getALL (req,res){
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        type_orders.title as type_order_title,type_orders.price as type_orders_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
    from orders
    inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
    inner join type_orders on type_orders.id_record = orders."typeOrderIdRecord"
    inner join users on users.login = orders."userLogin"
    inner join localities on localities.id_record = orders."localityIdRecord"
    inner join streets on streets.id_record = orders."streetIdRecord"
    ;`
        const order = await db.query(s)
        //const orders = await Order.findAll()
        return res.json(orders)
    }
    async getOne (req,res){
        
    }
}

module.exports = new OrderController()