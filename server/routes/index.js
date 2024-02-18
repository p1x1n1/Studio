const Router = require('express')
const router = new Router
const userRouters=require('./userRoutes')
const orderRouters=require('./orderRoutes')
const boquetRouters=require('./boquetRouter')
const flowerRouters=require('./flowerRouter')
const categoryRouter=require('./categoryRouter')
const WrappercategoryRouter = require('./WrappercategoryRouter')

router.use('/user',userRouters)
router.use('/order',orderRouters)
router.use('/flow',flowerRouters)
router.use('/boquet',boquetRouters)
router.use('/category',categoryRouter)
router.use('/wrapper_category',WrappercategoryRouter)

module.exports = router