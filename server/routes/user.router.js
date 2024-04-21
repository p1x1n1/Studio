const Router = require('express')
const router = new Router
const userController = require('../controllers/user.controller')

router.post('/',userController.createUser)
router.post('/:login',userController.updateUser)
router.get('/',userController.getUser)
router.get('/:login', userController.getOneUser)
router.delete('/:login', userController.deleteUser)

module.exports = router