const {WrapperCategory } = require("../models/models")
const ApiError = require('../error/ApiError');
const db = require('../db.pool')
class WrapperCategoryController{
    async create (req,res){
        const {id_record,title} = req.body
        let category;
        if (id_record) {
            category = await WrapperCategory.update(
                { title }, 
                { where: { id_record } }
            );
        } else {
            category = await WrapperCategory.create({ title }); 
        }
        return res.json(category);
    }

    async getALL (req,res){
        const categorys = await WrapperCategory.findAll()
        return res.json(categorys)
    }
    async getOne (req,res){
        const id = req.params.id
        console.log(id)
        const category = await WrapperCategory.findAll({where:
            {id_record: id}
        })
        return res.json(category[0])
    }
    async deleteOne (req,res){
        const id = req.params.id
        console.log(id)
        const category = await WrapperCategory.destroy({where:
            {id_record: id}
        })
        res.json({ success: true })
    }
}

module.exports = new WrapperCategoryController()