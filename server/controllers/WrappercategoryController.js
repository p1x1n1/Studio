const {WrapperCategory } = require("../models/models")
const ApiError = require('../error/ApiError');
const db = require('../db.pool')
class CategoryController{
    async create (req,res){
        const {title} = req.body
        const category = await WrapperCategory.create({title} )//await=async
        return res.json(category)
    }

    async getALL (req,res){
        const categorys = await WrapperCategory.findAll()
        return res.json(categorys)
    }
    async getOne (req,res){
        
    }
}

module.exports = new CategoryController()