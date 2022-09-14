const express = require('express')
const router = express.Router()
const {register,login, logout} = require('../controllers/user-controller')
const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {comment,commentsDelete ,commentDelete , commentUpdate ,comments } = require('../controllers/comment-controller.js')
const {liker,likesDelete,commentLikesDelete,likes} = require('../controllers/like-controller')
const { follower, notification ,notified} = require('../controllers/follow-controller')
const { authenticateToken ,createNewToken } = require('../controllers/jwt-controller')
router.post('/register',register)


router.post('/login',login,(req,res)=>{
    console.log("after going through login")
    
   
})


router.post('/logout',authenticateToken,logout)

router.post('/post',authenticateToken,post,notification)
router.delete('/postDelete',authenticateToken,likesDelete,commentsDelete,postDelete)
router.put('/postUpdate',authenticateToken,postUpdate)
router.get('/getPosts',getPosts)
router.get('/getSinglePost/:id',authenticateToken,getSinglePost)

router.get('comments',comments)
router.post('/comment',authenticateToken,comment)
router.delete('/commentDelete',authenticateToken,commentDelete,commentLikesDelete)
router.put('/commentUpdate',authenticateToken,commentUpdate)

router.post('/like',authenticateToken,liker)
router.get('/likes',likes)

router.post('/notifications',authenticateToken,notified)


router.post('/dummy',authenticateToken,(req,res)=>{
   res.send(req.body.user.name)
})

router.post('/follow',authenticateToken,follower)

router.post('/token',createNewToken)
module.exports = router