const express = require('express')
const router = express.Router()
const {register,login, logout} = require('../controllers/user-controller')
const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {comment,commentsDelete ,commentDelete , commentUpdate ,comments } = require('../controllers/comment-controller.js')
const {liker,likesDelete,commentLikesDelete,likes} = require('../controllers/like-controller')
const { follower, notification ,notified} = require('../controllers/follow-controller')
const { authenticateToken ,createNewToken } = require('../controllers/jwt-controller')
const { getPostsAdmin, approve } = require('../controllers/admin-controller')
const {registerValidate,loginValidate} = require('../validationLayer/userDetailsvalidaton')

const {likeValidate } = require('../validationLayer/likeDetailsValidator')
const {postValidate , postUpdateValidate , postDeleteValidate} = require('../validationLayer/postDetailsValidator')
const {commentValidate , commentUpdateValidate, commentDeleteValidate} = require('../validationLayer/commentDetailsValidator')

const {followDetailsValidator} = require('../validationLayer/followDetailsValidator')

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