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
		} else {
			order = await db.query('INSERT INTO orders ("statusOrderIdRecord", "deliveryIdRecord", "localityIdRecord", "streetIdRecord", "house_number", adress_comment, date_order, time_order, anonymized, comment, price, "userLogin") values ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *', [statusOrderIdRecord, deliveryIdRecord, localityIdRecord, streetIdRecord, house_number, adress_comment, date_order, time_order, anonymized, comment, price, userLogin])
		}
        res.json(order.rows[0])

    }

    async getALL (req,res){
        const { offset = 0, limit = 10 } = req.query;
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
        inner join discounts on discounts.id_record = users."discountIdRecord"
        LIMIT ${limit} OFFSET ${offset}
        ;`
        const orders = await db.query(s)
        const ordersWithComposition = await Promise.all(orders.rows.map(async order => {
            const compositionQuery = `
            SELECT arc,composition_orders.cnt,postcard_comment,postcard,bouquets.title as title, ready_made,bouquets.img as img, bouquets.price as price,
            wrappers.title as wrapper_name
            FROM composition_orders 
            INNER JOIN bouquets on bouquets.arc = composition_orders."bouquetArc" 
            Inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record
            WHERE "orderNumberOrder" =($1)	
            `;
            const composition = await db.query(compositionQuery, [order.number_order]);
            return {
                ...order,
                composition: composition.rows
            };
        }));
        const totalCountResult = await db.query(
        `   SELECT COUNT(orders.number_order) AS total
            FROM orders`
        );
        const totalCount = totalCountResult.rows[0].total;
        res.json({
            total: totalCount,
            orders: ordersWithComposition
        });
    }
    async getAdmin(req,res){
        const status = req.params.status;
        const { offset = 0, limit = 10, number_order} = req.query;
        let params = [status];
        let ordersQuery  = `SELECT 
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
        `
        if (number_order) {
            ordersQuery += ' AND orders.number_order = ($2) ORDER BY orders.number_order LIMIT ($3) OFFSET ($4)';
            params.push(number_order);
            params.push(limit, offset);
        } else{
        ordersQuery += ' ORDER BY orders.number_order LIMIT ($2) OFFSET ($3)';
        params.push(limit, offset);}

        const orders = await db.query(ordersQuery, params);

        const totalCountQuery = `
            SELECT COUNT(*) AS total
            FROM orders
            where "statusOrderIdRecord" = ($1)
        `;
        console.log('orders',orders.rows)
        const totalCountResult = await db.query(totalCountQuery, [status]);
        const totalCount = totalCountResult.rows[0].total;
        const ordersWithComposition = await Promise.all(orders.rows.map(async order => {
            const compositionQuery = `
            SELECT arc,composition_orders.cnt,postcard_comment,postcard,bouquets.title as title, ready_made,bouquets.img as img, bouquets.price as price,
            wrappers.title as wrapper_name
            FROM composition_orders 
            INNER JOIN bouquets on bouquets.arc = composition_orders."bouquetArc" 
            Inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record
            WHERE "orderNumberOrder" =($1)	
            `;
            const composition = await db.query(compositionQuery, [order.number_order]);
            return {
                ...order,
                composition: composition.rows
            };
        }));
        res.json({
            total: totalCount,
            orders: ordersWithComposition
        });
    }
    async getUser(req,res){
        const login = req.params.login;
        const s  = `SELECT 
        *,
        status_orders.title as status_order_title,
        deliveries.title as type_order_title,deliveries.price as delivery_price_delivery,
        users.phone as users_phone,users.name_ as users_name, users.surname as users_surname, users.lastname as users_lastname, 
        streets.title as streets_name, localities.title as localities_name,
        discounts.procent as procent
        from orders
        inner join status_orders on status_orders.id_record = orders."statusOrderIdRecord"
        inner join deliveries on deliveries.id_record = orders."deliveryIdRecord"
        inner join users on users.login = orders."userLogin"
        inner join discounts on users."discountIdRecord" = discounts.id_record
        inner join localities on localities.id_record = orders."localityIdRecord"
        inner join streets on streets.id_record = orders."streetIdRecord"
        where "userLogin" = ($1)
        `
        const orders = await db.query(s,[login])
        return res.json(orders.rows)
    }
    async getFlorist(req,res){
        try {const status = req.params.status;
        const login = req.params.login;
        const { number_order, offset = 0, limit = 10 } = req.query;
        let params = [login, status];
        let ordersQuery  = `SELECT 
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
        where "statusOrderIdRecord" = ($2) and "floristLogin" = ($1)
        `
        if (number_order) {
            ordersQuery += ' AND orders.number_order = ($3) ORDER BY orders.number_order LIMIT ($4) OFFSET ($5)';
            params.push(number_order);
            params.push(limit, offset);
        } else{
        ordersQuery += ' ORDER BY orders.number_order LIMIT ($3) OFFSET ($4)';
        params.push(limit, offset);}

        const orders = await db.query(ordersQuery, params);

        const totalCountQuery = `
            SELECT COUNT(orders.number_order) AS total
            FROM orders
            WHERE "statusOrderIdRecord" = ($2) and "floristLogin" = ($1)
        `;
        
        const totalCountParams = [login, status];
        if (number_order) {
            totalCountQuery += ' AND orders.number_order = $3';
            totalCountParams.push(number_order);
        }

        const totalCountResult = await db.query(totalCountQuery, totalCountParams);
        const totalCount = totalCountResult.rows[0].total;
        
        const ordersWithComposition = await Promise.all(orders.rows.map(async order => {
            const compositionQuery = `
            SELECT arc,composition_orders.cnt,postcard_comment,postcard,bouquets.title as title, ready_made,bouquets.img as img, bouquets.price as price,
            wrappers.title as wrapper_name
            FROM composition_orders 
            INNER JOIN bouquets on bouquets.arc = composition_orders."bouquetArc" 
            Inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record
            WHERE "orderNumberOrder" =($1)	
            `;
            const composition = await db.query(compositionQuery, [order.number_order]);
            return {
                ...order,
                composition: composition.rows
            };
        }));
        res.json({
            total: totalCount,
            orders: ordersWithComposition
        });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async getCourier(req,res){
        const status = req.params.status;
        const login = req.params.login;
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
        return res.json(order.rows[0])
    }
    async getAllSum (req,res){
        const start = req.params.start_date
		const end = req.params.end_date
        const order = await db.query(`
		SELECT sum(price) FROM orders
		WHERE date_order BETWEEN ($1) AND ($2)				
		`
		,[start,end])
        return res.json(order.rows[0])
    }
}

module.exports = new OrderController()