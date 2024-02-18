const { Bouquet } = require("../models/models")

class BoquetController{
    async create (req,res){
        const {name} = req.body
        const type = await Type.create()//await=async
        return res.json(type)
    }

    async getALL (req,res){
        const boquet = await Bouquet.findAll()
        return res.json(boquet)
    }
    async getOne (req,res){
        
    }
}

module.exports = new BoquetController()