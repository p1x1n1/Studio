const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Order, Employee, Post, Discount} = require('../models/models')
const generateJwt = (login, email,phone,post) => {
    return jwt.sign(
        {login, email, phone,post},
        process.env.SECRET_KEY,
        {expiresIn: '8h'}
    )
}
class AuthController{
    async registration(req, res, next) {
        try {
            const { login, email, password_, name_, lastname, surname, phone } = req.body.login;
            if (!email || !password_ || !login) {
                return next(ApiError.badRequest('Некорректный email, логин или пароль'));
            }

            const existingUserByLogin = await User.findOne({ where: { login } });
            const existingEmployeeByLogin = await Employee.findOne({ where: { login } });
            const existingUserByEmail = await User.findOne({ where: { email } });

            if (existingUserByLogin || existingEmployeeByLogin) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
            }

            if (existingUserByEmail) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже существует'));
            }

            const hashPassword = await bcrypt.hash(password_, 5);
            const user = await User.create({
                login,
                email,
                password_: hashPassword,
                name_,
                lastname,
                surname,
                phone,
                order_sum: 0,
                discountIdRecord: 1
            });

            const token = generateJwt(login, email, phone, 'user');
            return res.json({ token });

        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Произошла ошибка при регистрации'));
        }
    }

    async login(req, res, next) {
        try {
            const { login, password_ } = req.body;
            let user = await User.findOne({ where: { login } });
            let post = 'user';

            if (!user) {
                user = await Employee.findOne({ where: { login } });
                if (!user) {
                    return next(ApiError.internal('Пользователь с таким логином не существует'));
                } else {
                    post = user.postIdRecord;
                    post = await Post.findOne({ where: { id_record: post } });
                    post = post.title;
                }
            }

            user.setDataValue('post', post);
            user.set('post', post, { raw: true });

            if (!user.password_) {
                const hashPassword = await bcrypt.hash(password_, 5);
                if (user.post === 'user') {
                    await User.update({ password_: hashPassword }, { where: { login } });
                } else {
                    await Employee.update({ password_: hashPassword }, { where: { login } });
                }
            } else {
                const comparePassword = bcrypt.compareSync(password_, user.password_);
                if (!comparePassword) {
                    return next(ApiError.internal('Указан неверный пароль'));
                }
            }

            const token = generateJwt(user.login, user.email, user.phone, post);
            user.password_ = undefined;
            return res.json({ token, user });

        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Произошла ошибка при авторизации'));
        }
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
        // if (!req.user.login || req.user.post) {
        // return next(ApiError.badRequest('Не задан логин или роль пользователя'))
        // }
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

}

module.exports = new AuthController()