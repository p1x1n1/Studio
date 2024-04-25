const { Delivery } = require("../models/models")
const db = require('../db.pool')
class DeliveryController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const delivery = await Delivery.findAll()
        return res.json(delivery)
    }
    async getOne (req,res){
        
    }
}

module.exports = new DeliveryController()