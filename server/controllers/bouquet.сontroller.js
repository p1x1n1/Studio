const uuid = require('uuid');
const db = require('../db.pool')
const path = require('path');


class BouquetController {
	async createBouquet(req, res) {
		const { arc, title,ready_made,price,wrapperIdRecord, description } = req.body
		console.log(req.body,req.files,req.body.img);
		let bouquet
		if (arc !="undefined") {
			if (req.files){
				let {img} = req.files
				let fileName = uuid.v4()+".jpg";
				img.mv(path.resolve(__dirname,'..','static',fileName));
				bouquet = await db.query('UPDATE bouquets set title = ($1),"wrapperIdRecord" = ($2) , description = ($3),img = ($4), price = ($5) where arc = ($6) RETURNING *', [title, wrapperIdRecord,description,fileName,price,arc])
			}
			else{
				bouquet = await db.query('UPDATE bouquets set title = ($1),"wrapperIdRecord" = ($2) , description = ($3), price = ($4) where arc = ($5) RETURNING *', [title, wrapperIdRecord,description,price,arc])
			}
		} else {
			if (req.files){
				let {img} = req.files
				let fileName = uuid.v4()+".jpg";
				img.mv(path.resolve(__dirname,'..','static',fileName));
				if (ready_made != 'undefined' ) bouquet = await db.query('INSERT INTO bouquets (title,ready_made,price,"wrapperIdRecord",description,img) values ($1, $2,$3,$4,$5,$6) RETURNING *', [title, ready_made,price,wrapperIdRecord,description, fileName])
				else bouquet = await db.query('INSERT INTO bouquets (title,price,"wrapperIdRecord",description,img,ready_made) values ($1, $2,$3,$4,$5,true) RETURNING *', [title, price,wrapperIdRecord,description, fileName])
			}	
			else{
				if (ready_made != 'undefined' ){ bouquet = await db.query('INSERT INTO bouquets (title,ready_made,price,"wrapperIdRecord",description) values ($1, $2,$3,$4,$5) RETURNING *', [title, ready_made,price,wrapperIdRecord,description])}
                else bouquet = await db.query('INSERT INTO bouquets (title,price,"wrapperIdRecord",description,redy_made) values ($1, $2,$3,$4) RETURNING *', [title, price,wrapperIdRecord,description])
			}
		}
		res.json(bouquet.rows[0])
	}
	async getBouquets(req, res) {
		const bouquet = await db.query('SELECT * FROM bouquets ORDER BY arc')
		res.json(bouquet.rows)
	}
	async getPopularBouquets(req, res) {
		const bouquet = await db.query(`SELECT bouquets.*, COUNT(  composition_orders."bouquetArc") AS bouquet_count
		FROM bouquets
		LEFT JOIN composition_orders ON bouquets.arc = composition_orders."bouquetArc"
		where ready_made=true
		GROUP BY bouquets.arc
		ORDER BY bouquet_count DESC
		LIMIT 10;
		`)
		res.json(bouquet.rows)
	}
	async getSeasonBouquets(req, res) {
		const bouquet = await db.query(`
		SELECT bouquets.*
		FROM bouquets
		WHERE ready_made = true
		AND are_all_flowers_in_season(bouquets.arc) = TRUE
		ORDER BY arc;
		`)
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
		let start_end= req.params.start_end
		let bouquet;
		console.log(req.params,flowers)
		if (start_end === 'undefined'){
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
		}
		else{
			start_end = start_end.split(',').map(Number);
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
					and "flowerIdRecord" in ${flowers} and bouquets.price between ${start_end[0]} and ${start_end[1]}
					order by arc;`,
					[category]
			)}
			else {
				if (category =='undefined'  && flowers =='(undefined)') {
					bouquet = await db.query(
						`select distinct on (arc) arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,
						bouquets."wrapperIdRecord", wrappers.title as wrapper_name,
						"categoryIdRecord", "flowerIdRecord", composition_bouquets.cnt
						from bouquets 
						inner join bouquet_categories on bouquets.arc = bouquet_categories."bouquetArc"
						inner join composition_bouquets on bouquets.arc = composition_bouquets."bouquetArc"
						inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
						where ready_made = true and bouquets.price between ${start_end[0]} and ${start_end[1]}
						order by arc;`
				)}
				else{
					if (category !='undefined'){
						bouquet = await db.query(
							`select  arc, bouquets.title, bouquets.ready_made,bouquets.price,bouquets.description,bouquets.img,
							bouquets."wrapperIdRecord", wrappers.title as wrapper_name,
							"categoryIdRecord"
							from bouquets 
							inner join bouquet_categories on bouquets.arc = bouquet_categories."bouquetArc"
							inner join wrappers on bouquets."wrapperIdRecord" = wrappers.id_record 
							where ready_made = true and "categoryIdRecord"=($1)  and bouquets.price between ${start_end[0]} and ${start_end[1]}
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
							and "flowerIdRecord" in ${flowers} and bouquets.price between ${start_end[0]} and ${start_end[1]}
							order by arc;`
					)}
				}
			}
		}
		res.json(bouquet.rows)
	}
	async getOneBouquet(req, res) {
		const arc = req.params.arc
		const int_arc = parseInt(arc);
		let bouquet;
		if(arc === int_arc.toString()){
		 bouquet = await db.query('SELECT * FROM bouquets WHERE arc = ($1)',[arc])}
		else{
             bouquet = await db.query
		    ('SELECT * FROM bouquets WHERE title = ($1)',[arc])
		}
		if (bouquet){
		res.json(bouquet.rows[0])}
		else{
			res.json({ message: 'Bouquet not found' })
        }
	}
	async deleteBouquet(req, res) {
		const arc = req.params.arc
		const bouquet = await db.query('DELETE FROM bouquets WHERE arc = ($1)',[arc])
		res.json({ success: true })
	}
}

module.exports = new BouquetController()