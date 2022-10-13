const express = require('express')
const router = express.Router()

const { createNewToken } = require('../controllers/jwt-controller')




const postRouter = require('./postRoute')
const commentRouter = require('./commentRoute')
const likeRouter = require('./commentRoute')
const followRouter = require('./likeRoute')
const userRouter = require('./userRoute')
const adminRouter = require('./adminRoute')

router.post('/token',createNewToken)

router.use('/post',postRouter)
router.use('/admin',adminRouter)
router.use('/comment',commentRouter)
router.use('/follow',followRouter)
router.use('/user',userRouter)
router.use('/like',likeRouter)

module.exports = router