const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Order, Employee, Post, Discount} = require('../models/models')
const generateJwt = (login, email,phone,post) => {
    return jwt.sign(
        {login, email, phone,post},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class AuthController{
    async registration (req,res){//jwt token //npm i jsonwebtoken bcrypt 
        const {login,email,password_,name_,lastname,surname,phone} = req.body
        if (!email || !password_ || !login){  return next(ApiError.badRequest('Некорекктный email,login или пароль'))   }
        const candidate = await User.findOne({where:{login}})//ещё в сотрудниках
        const candidate2 = await Employee.findOne({where:{login}})
        if(candidate || candidate2){ return next(ApiError.badRequest('Пользователь с таким логином уже существует'))}
        const hashPassword = await bcrypt.hash(password_,5)//хэшируемый пароль
        const user = await User.create({login,email,password_: hashPassword,name_,lastname,surname,phone,order_sum:0,discountIdRecord:1})
        
        const token = generateJwt(login, email,phone,'user')
        
        return res.json({token})
    }  

    async login (req,res,next){
        const {login, password_} = req.body
        let user = await User.findOne({where:{login}})
        let post = 'user'
        if(!user){ 
            user = await Employee.findOne({where:{login}})
            post = user.postIdRecord
            post = await Post.findOne({where:{id_record: post}})
            post = post.title
            if (!user){
                return next(ApiError.internal('Пользователь с таким логином не существует'))
            }
        }      
        if (post==='user'){
             //procent = await Discount.findOne({where:{id_record: user.discountIdRecord}})
             //console.log(procent)
             //user.setDataValue('procent', procent.procent);
             //user.set('procent', procent.procent, { raw: true });
        }
        user.setDataValue('post', post); // Добавляем поле post к объекту user.dataValues
        user.set('post', post, { raw: true }); // Устанавливаем поле post как атрибут

        if(user.password_===null||''||undefined){
            const hashPassword = await bcrypt.hash(password_,5);//хэшируемый пароль
            (user.post ==='user') ? await User.update({ password_: hashPassword }, { where: { login } })
            : await Employee.update({ password_: hashPassword }, { where: { login } });
            console.log('user', user);
        }
        else{
            let comparePassword = bcrypt.compareSync(password_, user.password_)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
        }

        const token = generateJwt(user.login, user.email, user.phone, post);
        user.password_ = undefined; // Удаляем поле password_ из user.dataValues
        // Выводим объект user с добавленным полем post и без поля password_
        console.log('user', user);
        // Отправляем ответ с токеном и объектом user
        return res.json({ token, user });
    }

    async check (req,res,next){//авторизован пользователь или нет
        /*const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
       // res.json('dsdwe')
       */
       console.log("CHECK")
       console.log('USER',req.user)
       let user = {} ;
       console.log('post',req.user.post)
        if (req.user.post == 'user'){
         user = await User.findOne({where:{login:req.user.login}})
        }
        else{
         user = await Employee.findOne({where:{login:req.user.login}})
        }
       user.setDataValue('post', req.user.post); // Добавляем поле post к объекту user.dataValues
       user.set('post', req.user.post, { raw: true }); // Устанавливаем поле post как атрибут

       const token = generateJwt(req.user.login, req.user.email,req.user.phone,req.user.post)
       return res.json({token,user})
    }
    // async getUser(req, res) {
    //     const {login,password_,post} = req.body
    //     console.log(login);
    //     let user;
    //     (post ==='user') ?
    //      user = await User.findOne({where:{login}})
    //     :  user = await Employee.findOne({where:{login}});
    //     let comparePassword = bcrypt.compareSync(password_, user.password_)
    //     if (!comparePassword) {
    //         return next(ApiError.internal('Указан неверный пароль'))
    //     }
    //     return res.json({user})
    // }
    async registrationEmployee(req,res){

    }
}

module.exports = new AuthController()