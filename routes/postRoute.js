const express = require('express')
const postRouter = express.Router()

const {post, postDelete , postUpdate ,getPosts, getSinglePost} = require('../controllers/post-controller')
const {commentsDelete  } = require('../controllers/comment-controller.js')
const {likesDelete} = require('../controllers/like-controller')
const { notification } = require('../controllers/follow-controller')
const { authenticateToken  } = require('../controllers/jwt-controller')

const {postValidate , postUpdateValidate , postDeleteValidate} = require('../validationLayer/postDetailsValidator')


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