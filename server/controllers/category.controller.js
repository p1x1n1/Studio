const {Category } = require("../models/models")
const db = require('../db.pool')
const { where } = require("sequelize")

class CategoryController{
    async create (req,res){
        const {id_record,title} = req.body
        let category;
        if (id_record) {
            category = await Category.update(
                { title }, // Обновляемые поля
                { where: { id_record } } // Условие для обновления
            );
        } else {
            category = await Category.create({ title }); // Создание новой записи
        }
        return res.json(category);
    }

    async getALL (req,res){
        const categorys = await Category.findAll()
        return res.json(categorys)
    }
    async getOne (req,res){
        const id = req.params.id
        console.log(id)
        const category = await Category.findAll({where:
            {id_record: id}
        })
        return res.json(category[0])
    }
    async deleteOne (req,res){
        const id = req.params.id
        console.log(id)
        const category = await Category.destroy({where:
            {id_record: id}
        })
        res.json({ success: true })
    }
}

module.exports = new CategoryController()