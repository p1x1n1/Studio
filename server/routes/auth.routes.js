const Router = require('express')
const router = new Router
const AuthController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',AuthController.registration)
router.post('/login',AuthController.login)
router.get('/auth',authMiddleware,AuthController.check)
// router.get('/user',AuthController.getUser)

//(req,res)=>{res.status(200).json({message:"AUTH"})}

module.exports = router