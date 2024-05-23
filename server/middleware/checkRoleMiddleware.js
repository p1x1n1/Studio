const jwt = require('jsonwebtoken')

module.exports = function(post) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            console.log(token)
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.post !== post) {//ВАЖНОЕ
                return res.status(403).json({message: "Нет доступа"})
            }
            req.post = decoded;
            next()
        } 
        catch (e) {
            res.status(404).json({message: "Не найдено"})
        }
    };
}


