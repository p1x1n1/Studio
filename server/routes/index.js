const Router = require('express')
const router = new Router
const userRouters=require('./userRoutes')
const orderRouters=require('./orderRoutes')
const bouquetRouters=require('./bouquet.router')
const flowerRouters=require('./flowerRouter')
const bouquetCompositionRouter = require('./bouquet.composition.routes.js')
const flowerRouter = require('./flower.routes.js')
const wrapperRouter = require('./wrapper.routes.js')
const categoryRouter=require('./categoryRouter')
const WrappercategoryRouter = require('./WrappercategoryRouter')

router.use('/user',userRouters)
router.use('/order',orderRouters)
//router.use('/flow',flowerRouters)
router.use('/flower',flowerRouter)
router.use('/bouquet',bouquetRouters)
router.use('/bouquetcomposition',bouquetCompositionRouter)
router.use('/wrapper',wrapperRouter)
router.use('/category',categoryRouter)
router.use('/wrapper/category',WrappercategoryRouter)


module.exports = router