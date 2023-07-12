const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter'); 
const ratingRouter = require('./ratingRouter'); 
const basketRouter = require('./basketRouter'); 


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/item', itemRouter)
router.use('/rating', ratingRouter)
router.use('/basket', basketRouter)

module.exports = router