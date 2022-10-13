const express = require('express')
const postRouter = express.Router()
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




//Start of post section
//To POST a post
postRouter.post('/post',postValidate,authenticateToken,post,notification)
//Fetch posts for admin which are pending

postRouter.delete('/post',postDeleteValidate,authenticateToken,likesDelete,commentsDelete,postDelete)
//Delete likesDelete commentsDelete postDelete


//To UPDATE post
postRouter.put('/post',postUpdateValidate,authenticateToken,postUpdate)
//To get all the posts which are approved
postRouter.get('/post',getPosts)
//To get single post with id 
postRouter.get('/post/:id',authenticateToken,getSinglePost)
//End of post section

module.exports = postRouter