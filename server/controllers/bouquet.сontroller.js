const { Bouquet } = require("../models/models")
const db = require('../db.pool')
class BouquetController {
	async createBouquet(req, res) {
		const { arc, title,ready_made,price,wrapperIdRecord, description, img } = req.body
		let bouquet
		if (arc) {
			bouquet = await db.query('UPDATE bouquets set title = ($1),"wrapperIdRecord" = ($2) , description = ($3),img = ($4), price = ($5) where arc = ($6) RETURNING *', [title, wrapperIdRecord,description,img,price,arc])
		} else {
			if( ready_made) bouquet = await db.query('INSERT INTO bouquets (title,ready_made,price,"wrapperIdRecord",description,img) values ($1, $2,$3,$4,$5,$6) RETURNING *', [title, ready_made,price,wrapperIdRecord,description, img])
			else bouquet = await db.query('INSERT INTO bouquets (title,price,"wrapperIdRecord",description,img) values ($1, $2,$3,$4,$5) RETURNING *', [title, price,wrapperIdRecord,description, img])
		}
		res.json(bouquet.rows[0])
	}
	async getBouquets(req, res) {
		const bouquet = await db.query('SELECT * FROM bouquets ORDER BY arc')
		res.json(bouquet.rows)
	}
	async getBouquetsInfo(req, res) {
		const bouquet = await db.query(
			`select arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,bouquets."wrapperIdRecord",
			wrappers.title as wrapper_name from bouquets inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
		   where ready_made = true order by arc;`
		)
		res.json(bouquet.rows)
	}
	async getBouquetsCategory(req, res) {
		const category = req.params.id_category
		const flowers = '('+req.params.flowers+')'
		//const f = req.params.flowers.split(',').map(Number);
		//const flowers =  (${f.join(',')});
		let bouquet;
		console.log(req.params,flowers)
		if (category !='undefined'  && flowers!='(undefined)') {
			 bouquet = await db.query(
				`select distinct on (arc) arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,
				bouquets."wrapperIdRecord", wrappers.title as wrapper_name,
				"categoryIdRecord", "flowerIdRecord", composition_bouquets.cnt
				from bouquets 
				inner join bouquet_categories on bouquets.arc = bouquet_categories."bouquetArc"
				inner join composition_bouquets on bouquets.arc = composition_bouquets."bouquetArc"
				inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
				where ready_made = true and "categoryIdRecord"=($1) 
				and "flowerIdRecord" in ${flowers}
				order by arc;`,
				[category]
		)}
		else {
			if (category !='undefined'){
				 bouquet = await db.query(
					`select  arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,
					bouquets."wrapperIdRecord", wrappers.title as wrapper_name,
					"categoryIdRecord"
					from bouquets 
					inner join bouquet_categories on bouquets.arc = bouquet_categories."bouquetArc"
					inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
					where ready_made = true and "categoryIdRecord"=($1) 
					order by arc;`,
					[category]
					)
			}
			if ( flowers!='(undefined)') {
				 bouquet = await db.query(
					`select distinct on (arc) arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,
					bouquets."wrapperIdRecord", wrappers.title as wrapper_name,
					 "flowerIdRecord", composition_bouquets.cnt
					from bouquets 
					inner join composition_bouquets on bouquets.arc = composition_bouquets."bouquetArc"
					inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
					where ready_made = true 
					and "flowerIdRecord" in ${flowers}
					order by arc;`
			)}
		}
		res.json(bouquet.rows)
	}
	async getOneBouquet(req, res) {
		const arc = req.params.arc
		const bouquet = await db.query('SELECT * FROM bouquets WHERE arc = ($1)',[arc])
		res.json(bouquet.rows[0])
	}
	async deleteBouquet(req, res) {
		const arc = req.params.arc
		const bouquet = await db.query('DELETE FROM bouquets WHERE arc = ($1)',[arc])
		res.json({ success: true })
	}
}

module.exports = new BouquetController()