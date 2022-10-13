const express = require('express')
const commentRouter = express.Router()

const {comment ,commentDelete , commentUpdate ,comments } = require('../controllers/comment-controller.js')
const {commentLikesDelete} = require('../controllers/like-controller')

const { authenticateToken  } = require('../controllers/jwt-controller')

const {commentValidate , commentUpdateValidate, commentDeleteValidate} = require('../validationLayer/commentDetailsValidator')





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