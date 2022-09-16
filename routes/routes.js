const express = require('express')
const router = express.Router()
const {register,login, logout} = require('../controllers/user-controller')
const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {comment,commentsDelete ,commentDelete , commentUpdate ,comments } = require('../controllers/comment-controller.js')
const {liker,likesDelete,commentLikesDelete,likes} = require('../controllers/like-controller')
const { follower, notification ,notified} = require('../controllers/follow-controller')
const { authenticateToken ,createNewToken } = require('../controllers/jwt-controller')
const { getPostsAdmin, approve } = require('../controllers/admin-controller')

//To REGISTER user
router.post('/register',register)


router.post('/login',login,(req,res)=>{
    console.log("after going through login")
    
   
})


router.post('/logout',authenticateToken,logout)

//Start of post section
//To POST a post
router.post('/post',authenticateToken,post,notification)
//Fetch posts for admin which are pending
router.post('/adminPosts',authenticateToken,getPostsAdmin)
//To APPROVE the post
router.post('/approve',authenticateToken,approve)
//To DELETE a post , delete comments and likes as middleware
router.delete('/post',authenticateToken,likesDelete,commentsDelete,postDelete)
//To UPDATE post
router.put('/post',authenticateToken,postUpdate)
//To get all the posts which are approved
router.get('/post',getPosts)
//To get single post with id 
router.get('/post/:id',authenticateToken,getSinglePost)
//End of post section



//Start of comment section
//fetches comments linked with a blog
router.post('/comments',comments)

//To post a comment
router.post('/comment',authenticateToken,comment)

//TO delete a comment
router.delete('/comment',authenticateToken,commentDelete,commentLikesDelete)

//To update comment
router.put('/comment',authenticateToken,commentUpdate)
//End of comment section


//Start of likes section
//To like a comment
router.post('/like',authenticateToken,liker)

//To bring likes linked to a comment
router.post('/likes',likes)
//End of likes section

//Start of notification section
router.post('/notifications',authenticateToken,notified)
//End of Notification section


router.post('/dummy',authenticateToken,(req,res)=>{
   res.send({username:req.body.user.name,role:req.body.user.role})
})

//start of follower section 
//To follow a user 
router.post('/follow',authenticateToken,follower)
//End of followe section

router.post('/token',createNewToken)
module.exports = router