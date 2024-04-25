const { Locality } = require("../models/models")
const db = require('../db.pool')
class LocalityController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const locality = await Locality.findAll()
        return res.json(locality)
    }
    async getOne (req,res){
        
    }
}

module.exports = new LocalityController()