const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Order} = require('../models/models')
const generateJwt = (login, email,role) => {
    return jwt.sign(
        {login, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController{
    async registration (req,res){//jwt token //npm i jsonwebtoken bcrypt 
        const {login,email,password_,name_,lastname,surname,phone} = req.body
        if (!email || !password_ || !login){  return next(ApiError.badRequest('Некорекктный email,login или пароль'))   }
        const candidate = await User.findOne({where:{login}})//ещё в сотрудниках
        if(candidate){ return next(ApiError.badRequest('Пользователь с таким логином уже существует'))}
        const hashPassword = await bcrypt.hash(password_,5)//хэшируемый пароль
        const user = await User.create({login,email,password_: hashPassword,name_,lastname,surname,phone,order_sum:0,discountIdRecord:1})
        
        const token = generateJwt(login, email,phone)
        
        return res.json({token})
    }  

    async login (req,res,next){
        const {login, password_} = req.body
        const user = await User.findOne({where:{login}})
        if(!user){ return next(ApiError.internal('Пользователь с таким логином не существует'))}
        let comparePassword = bcrypt.compareSync(password_, user.password_)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.login, user.email)
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
       const token = generateJwt(req.user.login, req.user.email)
       return res.json({token})
    }
}

module.exports = new UserController()