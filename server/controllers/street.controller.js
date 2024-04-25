const { Street } = require("../models/models")
const db = require('../db.pool')
class StreetController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const street = await Street.findAll()
        return res.json(street)
    }
    async getOne (req,res){
        
    }
}

module.exports = new StreetController()