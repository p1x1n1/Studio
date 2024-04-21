const { Post } = require("../models/models")
const db = require('../db.pool')
class PostController{
    async create (req,res){
        
    }

    async getALL (req,res){
        const post = await Post.findAll()
        return res.json(post)
    }
    async getOne (req,res){
        
    }
}

module.exports = new PostController()