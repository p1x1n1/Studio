const { Order } = require("../models/models")
const db = require('../db.pool')

class OrderController{
    async create (req,res){
        const {number, statusOrderId, typeOrderId, localityId, streetId, house_number, adress_comment, data_order, time_order, anonymized, comment, cost, userLogin, employeeLogin, courierLogin, floristLogin } = req.body
		let order
		if (number) {
			order = await db.query('UPDATE orders set statusOrderId = ($1),employeeLogin  = ($2), courierLogin  = ($3), floristLogin  = ($4) where number = ($5) RETURNING *', [,statusOrderId,employeeLogin, courierLogin, floristLogin,number])
		} else {
			order = await db.query('INSERT INTO orders (statusOrderId, typeOrderId, localityId, streetId, house_number, adress_comment, data_order, time_order, anonymized, comment, cost, userLogin) values ($1, $2,$3,$4,$5,$6,$7,$8,$9,&10,$11,$12) RETURNING *', [statusOrderId, typeOrderId, localityId, streetId, house_number, adress_comment, data_order, time_order, anonymized, comment, cost, userLogin])
		}
		res.json(order.rows[0])
    }

    async getALL (req,res){
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        type_orders.title as type_order_title,type_orders.price_delivery as type_orders_price_delivery,
        users.phone as users_phone,users.name as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.name as streets_name, localities.name as localities_name
    from orders
    inner join status_orders on status_orders.id = orders."statusOrderId"
    inner join type_orders on type_orders.id = orders."typeOrderId"
    inner join users on users.login = orders."userLogin"
    inner join localities on localities.id = orders."localityId"
    inner join streets on streets.id = orders."streetId"
    ;`
        const order = await db.query(s)
        //const orders = await Order.findAll()
        return res.json(orders)
    }
    async getOne (req,res){
        
    }
}

module.exports = new OrderController()