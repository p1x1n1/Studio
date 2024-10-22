
const db = require('../db.pool')
class OrderCompositionController {
	async createOrderComposition(req, res) {
		const { orderNumberOrder, bouquetArc,cnt,postcard,postcard_comment } = req.body
		const {num} = req.query
		let order
		console.log(req.body,req.query,num)
		if (!orderNumberOrder) {
			const {arc} = req.body
			order = await db.query('INSERT INTO composition_orders ("orderNumberOrder","bouquetArc",cnt,postcard,postcard_comment) values ($1, $2,$3,$4,$5) RETURNING *', [ num, arc,cnt,postcard,postcard_comment])}
		else order = await db.query('INSERT INTO composition_orders ("orderNumberOrder","bouquetArc",cnt,postcard,postcard_comment) values ($1, $2,$3,$4,$5) RETURNING *', [ orderNumberOrder ,bouquetArc,cnt,postcard,postcard_comment])
		res.json(order.rows[0])
	}
	async updateOrderComposition(req, res) {
		const { orderNumberOrder, bouquetArc,cnt } = req.body
		let order
		order = await db.query('UPDATE composition_orders set cnt = ($1) where "orderNumberOrder" = ($2) and "bouquetArc" = ($3)  RETURNING *', [cnt, orderNumberOrder ,bouquetArc])
		res.json(order.rows[0])
	}
	async getOrderCompositions(req, res) {
		const order = await db.query('SELECT "orderNumberOrder","bouquetArc", flowers.name_type as flower_name FROM composition_orders INNER JOIN flowers on flowers.id_type=composition_orders.bouquetArc ORDER BY orderNumberOrder,bouquetArc ')
		res.json(order.rows)
	}
	async getAdminSales(req, res) {
		const start = req.params.start_date
		const end = req.params.end_date
		const { login} = req.query;
		let params = [start,end]
		let orderS = 
			`
			SELECT bouquets.title as title, sum(cnt) as cnt, sum(cnt*bouquets.price) as all_sum,
			ROUND(sum(cnt*bouquets.price)/sum(cnt),2) as one_sum
			FROM composition_orders
			INNER JOIN bouquets on bouquets.arc = composition_orders."bouquetArc"
			INNER JOIN orders on orders.number_order = composition_orders."orderNumberOrder"
			WHERE date_order BETWEEN ($1) AND ($2)	
					
		`
        if(login){
            orderS += ` AND ("floristLogin"=($3) OR "courierLogin"=($3) ) `
            params.push(login)
        }
		orderS += `GROUP BY  title`
        let order = await db.query(orderS,params)
		res.json(order.rows)
	}
	async getOrderComposition(req, res) {
		const orderNumberOrder = req.params.orderNumberOrder
		const order = await db.query(`
		SELECT arc,composition_orders.cnt,postcard_comment,postcard,bouquets.title as title, ready_made,bouquets.img as img, bouquets.price as price,
		wrappers.title as wrapper_name
		FROM composition_orders 
		INNER JOIN bouquets on bouquets.arc = composition_orders."bouquetArc" 
		Inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record
		WHERE "orderNumberOrder" =($1)				
		`
		,[orderNumberOrder])
		res.json(order.rows)
	}
	async getOneOrderFlowerComposition(req, res) {
		const orderNumberOrder = req.params.orderNumberOrder
		const bouquetArc = req.params.bouquetArc
		const order = await db.query('SELECT * FROM composition_orders WHERE orderNumberOrder = ($1) and bouquetArc = ($2)',[orderNumberOrder,bouquetArc])
		res.json(order.rows[0])
	}
	async deleteOrderComposition(req, res) {
		const orderNumberOrder = req.params.orderNumberOrder
		const order = await db.query('DELETE FROM composition_orders WHERE orderNumberOrder = ($1)',[orderNumberOrder])
		res.json({ success: true })
	}
	async deleteOrderFlowerComposition(req, res) {
		const orderNumberOrder = req.params.orderNumberOrder
		const bouquetArc = req.params.bouquetArc
		const order = await db.query('DELETE FROM composition_orders WHERE orderNumberOrder = ($1) and bouquetArc = ($2)',[orderNumberOrder,bouquetArc])
		res.json({ success: true })
	}
}

module.exports = new OrderCompositionController()
