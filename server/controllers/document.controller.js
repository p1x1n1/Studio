const db = require('../db.pool')
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/document');
const checkTemplete = require('../documents/check');
const path = require('path');

class documentController {
	async create(req, res){
		console.log('Create',req.body);
		pdf.create(pdfTemplate(req.body), {}).toFile(path.resolve(__dirname,'..','static','result.pdf'), (err) => {
			if(err) {
				res.send(Promise.reject());
			}
			res.send(Promise.resolve());
		});
	};
	async createUserCheck(req, res){
		console.log('Create',req.body);
		pdf.create(checkTemplete(req.body), {}).toFile(path.resolve(__dirname,'..','static','result.pdf'), (err) => {
			if(err) {
				res.send(Promise.reject());
			}
			res.send(Promise.resolve());
		});
	};
	
	async getOne(req, res) {
		console.log('getOne')
		console.log(path.resolve(__dirname,'..','static','result.pdf'));
		res.sendFile(path.resolve(__dirname,'..','static','result.pdf'));

	}
}

module.exports = new documentController()
