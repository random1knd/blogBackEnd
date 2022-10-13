const express = require('express')
const followRouter = express.Router()
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



//Start of notification section
followRouter.post('/notifications',authenticateToken,notified)
//End of Notification section



//start of follower section 
//To follow a user 
followRouter.post('/follow',followDetailsValidator,authenticateToken,follower)
//End of followe section


module.exports = followRouter