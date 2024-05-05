const { Discount } = require("../models/models")
const db = require('../db.pool')
class DiscountController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const discounts = await Discount.findAll()
        return res.json(discounts)
    }
    async getOne (req,res){
        const id = req.params.id_record
        const discounts = await Discount.findOne({where:
            {id_record: id}
        })
        return res.json(discounts)
    }
    async deleteOne (req,res){
        const id = req.params.id_record
        const discounts = await Discount.destroy({where:
            {id_record: id}
        })
        return res.json(discounts)
    }
}

module.exports = new DiscountController()