const uuid = require('uuid')
const path= require('path')
const { Flower } = require("../models/models")
const ApiError = require('../error/ApiError');


class FlowerController{
    async create (req,res,next){
        try{
            const {name,count,price,info} = req.body//про info на 51 минуте
            const {img} = req.files
            let filename = uuid.v4()+".jpg"//
            img.mv(path.resolve(__dirname,'..','static',filename))//__dirname - tek papka with controller, .. vozvrat na server,static perexod
            const flower = await Flower.create({name,count,price,img: fileName} )//await=async
            /* if (info){
                info = JSON.parse(info)
                info.forEach(

                )
            }//если инфо пришло
            */
            return res.json(flower)
        }
        catch (e) {
        next(ApiError.badRequest(e.message))
        }
    }

    async getALL (req,res){
        /*const {name,limit,page} = res.quire
        page = page || 1
        limit = limit || 9
        let offset = page + limit - limit 
        let flower
        if (name){ //сортировка
            flower = await Flower.findAndCountAll({where:name})
        }
        if(!name){
            flower = await Flower.findAndCountAll({limit, offset})
        }
        return res.json(flower)*/
    }
    async getOne (req,res){//53
        
    }
}

module.exports = new FlowerController()