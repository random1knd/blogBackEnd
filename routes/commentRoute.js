const express = require('express')
const commentRouter = express.Router()
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



//Start of comment section
//fetches comments linked with a blog
commentRouter.post('/comments',comments)

//To post a comment
commentRouter.post('/comment',commentValidate,authenticateToken,comment)

//TO delete a comment
commentRouter.delete('/comment',commentDeleteValidate,authenticateToken,commentLikesDelete,commentDelete)
//Delete commentDelete commentLikesDelete


//To update comment
commentRouter.put('/comment',commentUpdateValidate,authenticateToken,commentUpdate)
//End of comment section


module.exports = commentRouter