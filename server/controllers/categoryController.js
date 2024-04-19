const {Category } = require("../models/models")
const db = require('../db.pool')

class CategoryController{
    async create (req,res){
        const {title} = req.body
        const category = await Category.create({title} )//await=async
        return res.json(category)
    }

    async getALL (req,res){
        const categorys = await Category.findAll()
        return res.json(categorys)
    }
    async getOne (req,res){
        
    }
}

module.exports = new CategoryController()