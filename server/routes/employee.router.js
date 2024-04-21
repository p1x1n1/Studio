const Router = require('express')
const router = new Router
const employeeController = require('../controllers/employees.controller')

router.post('/',employeeController.createEmployee)
router.post('/:login',employeeController.updateEmployee)
router.get('/',employeeController.getEmployee)
router.get('/:login', employeeController.getOneEmployee)
router.delete('/:login', employeeController.deleteEmployee)

module.exports = router