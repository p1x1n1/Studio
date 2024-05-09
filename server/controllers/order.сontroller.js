const { Order } = require("../models/models")
const db = require('../db.pool')

class OrderController{
    async create (req,res){
        const {number_order, statusOrderIdRecord, deliveryIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, date_order, time_order, anonymized, comment, price, userLogin, employeeLogin, courierLogin, floristLogin } = req.body
		console.log(JSON.stringify(req.body));
        let order
		if (number_order) {
            if (floristLogin){ order = await db.query('UPDATE orders set "floristLogin"  = ($1) where number_order = ($2) RETURNING *', [floristLogin,number_order])}
            if (courierLogin){ order = await db.query('UPDATE orders set "courierLogin"  = ($1) where number_order = ($2) RETURNING *', [courierLogin,number_order])}
			if (employeeLogin){ order = await db.query('UPDATE orders set "statusOrderIdRecord" = ($1),"employeeLogin"  = ($2) where number_order = ($3) RETURNING *', [statusOrderIdRecord,employeeLogin,number_order])}  
            if (statusOrderIdRecord){ order = await db.query('UPDATE orders set "statusOrderIdRecord" = ($1) where number_order = ($2) RETURNING *', [statusOrderIdRecord,number_order])}
            //order = await db.query('UPDATE orders set "statusOrderIdRecord" = ($1),"employeeLogin"  = ($2), "courierLogin"  = ($3), "floristLogin"  = ($4) where number_order = ($5) RETURNING *', [statusOrderIdRecordRecord,employeeLogin, courierLogin, floristLogin,number_order])
		} else {
			order = await db.query('INSERT INTO orders ("statusOrderIdRecord", "deliveryIdRecord", "localityIdRecord", "streetIdRecord", "house_number", adress_comment, date_order, time_order, anonymized, comment, price, "userLogin") values ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *', [statusOrderIdRecord, deliveryIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, date_order, time_order, anonymized, comment, price, userLogin])
		}
        res.json(order.rows[0])

    }

    async getALL (req,res){
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as deliveries_price_deliveries,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        inner join discounts on discounts.id_record = orders."discountIdRecord"
        ;`
        const orders = await db.query(s)
        //const orders = await Order.findAll()
        return res.json(orders.rows)
    }
    async getAdmin(req,res){
        const status = req.params.status;
        //console.log(req.params,'req')
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as delivery_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where "statusOrderIdRecord" = ($1)
        Order by "createdAt" asc;
        ;`
        const orders = await db.query(s,[status])
        //const orders = await Order.findAll()
        return res.json(orders.rows)
    }
    async getUser(req,res){
        const login = req.params.login;
        //console.log(req.params,'req')
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as delivery_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where "userLogin" = ($1)
        Order by "createdAt" asc;
        ;`
        const orders = await db.query(s,[login])
        //const orders = await Order.findAll()
        return res.json(orders.rows)
    }
    async getFlorist(req,res){
        const status = req.params.status;
        const login = req.params.login;
        // console.log(req.params,'params')
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as delivery_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where "statusOrderIdRecord" = ($1) and "floristLogin" = ($2)
        Order by "createdAt" asc;
        ;`
        const orders = await db.query(s,[status,login])
        //const orders = await Order.findAll()
        return res.json(orders.rows)
    }

    async getCourier(req,res){
        const status = req.params.status;
        const login = req.params.login;
        // console.log(req.params,'params')
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as delivery_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where "statusOrderIdRecord" = ($1) and "courierLogin" = ($2)
        Order by "createdAt" asc;
        ;`
        const orders = await db.query(s,[status,login])
        //const orders = await Order.findAll()
        return res.json(orders.rows)
    }
    
    async getOne (req,res){
        const number_order = req.params.number_order;
        const order = await db.query(`
        SELECT
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as deliveries_price_deliveries,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where number_order = ($1)
        ;` ,[number_order])
    }
}

module.exports = new OrderController()