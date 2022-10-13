const express = require('express')
const likeRotuer = express.Router()

const {liker,likes} = require('../controllers/like-controller')

const { authenticateToken  } = require('../controllers/jwt-controller')

const {likeValidate } = require('../validationLayer/likeDetailsValidator')


//Start of likes section
//To like a comment
likeRotuer.post('/like',likeValidate,authenticateToken,liker)

//To bring likes linked to a comment
likeRotuer.post('/likes',likes)
//End of likes section
module.exports = likeRotuer