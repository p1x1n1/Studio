const { Discount } = require("../models/models")

class DiscountController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const discounts = await Discount.findAll()
        return res.json(discounts)
    }
    async getOne (req,res){
        
    }
}

module.exports = new DiscountController()