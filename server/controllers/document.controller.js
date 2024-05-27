const db = require('../db.pool')
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/document');
const checkTemplete = require('../documents/check');
const salesTemplete = require('../documents/sales');
const madedTemplete = require('../documents/maded');
const deliveryTemplete = require('../documents/delivery');
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
	async createAdminSales(req, res){
		console.log('Create',req.body);
		pdf.create(salesTemplete(req.body), {}).toFile(path.resolve(__dirname,'..','static','sales.pdf'), (err) => {
			if(err) {
				res.send(Promise.reject());
			}
			res.send(Promise.resolve());
		});
	};
	async createFloristMaded(req, res){
		console.log('Create',req.body);
		pdf.create(madedTemplete(req.body), {}).toFile(path.resolve(__dirname,'..','static','maded.pdf'), (err) => {
			if(err) {
				res.send(Promise.reject());
			}
			res.send(Promise.resolve());
		});
	};
	async createCourierDelivery(req, res){
		console.log('Create',req.body);
		pdf.create(deliveryTemplete(req.body), {}).toFile(path.resolve(__dirname,'..','static','delivery.pdf'), (err) => {
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
	async getSales(req, res) {
		console.log('getOne')
		console.log(path.resolve(__dirname,'..','static','sales.pdf'));
		res.sendFile(path.resolve(__dirname,'..','static','sales.pdf'));

	}
	async getMaded(req, res) {
		console.log('getOne')
		console.log(path.resolve(__dirname,'..','static','maded.pdf'));
		res.sendFile(path.resolve(__dirname,'..','static','maded.pdf'));

	}
	async getDelivery(req, res) {
		console.log('getOne')
		console.log(path.resolve(__dirname,'..','static','delivery.pdf'));
		res.sendFile(path.resolve(__dirname,'..','static','delivery.pdf'));

	}
}

module.exports = new documentController()
