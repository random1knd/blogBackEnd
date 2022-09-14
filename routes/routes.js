const express = require('express')
const router = express.Router()
const {register,login, logout, authenticateToken, createNewToken} = require('../controllers/user-controller')
const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {comment ,commentDelete , commentUpdate } = require('../controllers/comment-controller.js')
const {liker} = require('../controllers/like-controller')

router.post('/register',register)


router.post('/login',login,(req,res)=>{
    console.log("after going through login")
    
   
})


router.post('/logout',authenticateToken,logout)

router.post('/post',authenticateToken,post)
router.delete('/postDelete',authenticateToken,postDelete)
router.put('/postUpdate',authenticateToken,postUpdate)
router.get('/getPosts',getPosts)
router.get('/getSinglePost/:id',authenticateToken,getSinglePost)


router.post('/comment',authenticateToken,comment)
router.delete('/commentDelete',authenticateToken,commentDelete)
router.put('/commentUpdate',authenticateToken,commentUpdate)

router.post('/like',authenticateToken,liker)


router.post('/dummy',authenticateToken,(req,res)=>{
   res.send(req.body.user.name)
})

router.post('/token',createNewToken)
module.exports = router