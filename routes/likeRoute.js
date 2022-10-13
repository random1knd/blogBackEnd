const express = require('express')
const likeRotuer = express.Router()
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




//Start of likes section
//To like a comment
likeRotuer.post('/like',likeValidate,authenticateToken,liker)

//To bring likes linked to a comment
likeRotuer.post('/likes',likes)
//End of likes section
module.exports = likeRotuer