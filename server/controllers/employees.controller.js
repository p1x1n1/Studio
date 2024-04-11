const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Employee, Order, User} = require('../models/models')
const generateJwt = (login, email,postid) => {
    return jwt.sign(
        {login, email, postid},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class EmployeeController{
    async registration (req,res){//jwt token //npm i jsonwebtoken bcrypt 
        const {login,email,password,Name,LastName,SurName,phone,postId} = req.body
        if (!email || !password || !login){  return next(ApiError.badRequest('Некорекктный email,login или пароль'))   }
        const candidate = await Employee.findOne({where:{login}}) && User.findOne({where:{login}}) //ещё в сотрудниках
        if(candidate){ return next(ApiError.badRequest('Пользователь с таким логином уже существует'))}
        const hashPassword = await bcrypt.hash(password,5)//хэшируемый пароль
        const employee = await Employee.create({login,email,password: hashPassword,Name,LastName,SurName,phone,postid})
        // const Order?//58
        const token = generateJwt(login, email,postid)
        return res.json({token})
    }  

    async login (req,res,next){
        const {login, password} = req.body
        const employee = await Employee.findOne({where:{login}})
        if(!employee){ return next(ApiError.internal('Пользователь с таким логином не существует'))}
        let comparePassword = bcrypt.compareSync(password, employee.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(employee.login, employee.email, employee.postid)
        return res.json({token})
    }

    async check (req,res,next){//авторизован пользователь или нет
        /*const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
       // res.json('dsdwe')
       */
       const token = generateJwt(req.employee.login, req.employee.email, req.employee.postid)
       return res.json({token})
    }
}

module.exports = new EmployeeController()