const { Order } = require("../models/models")

class OrderController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const orders = await Order.findAll()
        return res.json(orders)
    }
    async getOne (req,res){
        
    }
}

module.exports = new OrderController()