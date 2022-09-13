const express = require('express')
const router = express.Router()
const {register,login, logout, authenticateToken, createNewToken} = require('../controllers/user-controller')
const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {comment,commentsDelete,singleCommentDelete,getPostComments } = require('../controllers/comment-controller.js')
const {liker , likesDelete ,commentLikesDelete, singleLikeDelete ,getCommentLikes} = require('../controllers/like-controller')

router.post('/register',register)


router.post('/login',login,(req,res)=>{
    console.log("after going through login")
    
   
})


router.get('/logout',logout,(req,res)=>{
    console.log("the user has logged out")
})

router.post('/post',post)
router.delete('/postDelete',likesDelete,commentsDelete,postDelete)
router.put('/postUpdate',postUpdate)
router.get('/getPosts',getPosts)
router.get('/getSinglePost/:id',getSinglePost)
router.get('/getWholePost/:id',getPostComments,getCommentLikes,getSinglePost)

router.post('/comment',comment)
router.post('/commentDelete',commentLikesDelete,singleCommentDelete)

router.post('/like',liker)
router.delete('/likeDelete',singleLikeDelete)

router.post('/dummy',authenticateToken,(req,res)=>{
   res.send(req.user)
})

router.post('/token',createNewToken)
module.exports = router