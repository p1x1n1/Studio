const Router = require('express')
const router = new Router

const orderRouter=require('./orderRoutes')
const localityRouter=require('./locality.router.js')
const streetRouter=require('./street.router.js')
const deliveryRouter=require('./delivery.router.js')
const bouquetRouter=require('./bouquet.router')
const flowerRouter=require('./flower.routes.js')
const bouquetCompositionRouter = require('./bouquet.composition.routes.js')
const userRouter = require('./user.router.js')
const basketRouter = require('./basket.router.js')
const selectedRouter = require('./selected.router.js')
const employeeRouter = require('./employee.router.js')
const wrapperRouter = require('./wrapper.routes.js')
const postRouter = require('./post.router.js')
const categoryRouter = require('./categoryRouter.js')
const WrappercategoryRouter = require('./WrappercategoryRouter')


router.use('/user',userRouter)
router.use('/employee',employeeRouter)
router.use('/post',postRouter)
router.use('/basket',basketRouter)
router.use('/selected',selectedRouter)
router.use('/order',orderRouter)
router.use('/locality',localityRouter)
router.use('/street',streetRouter)
router.use('/delivery',deliveryRouter)
//router.use('/flow',flowerRouter)
router.use('/flower',flowerRouter)
router.use('/bouquet',bouquetRouter)
router.use('/bouquetcomposition',bouquetCompositionRouter)
router.use('/wrapper',wrapperRouter)
router.use('/category',categoryRouter)
router.use('/wrapper/category',WrappercategoryRouter)


module.exports = router