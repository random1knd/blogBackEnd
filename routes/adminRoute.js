const express = require('express')
const adminRouter = express.Router()

const { authenticateToken  } = require('../controllers/jwt-controller')
const { getPostsAdmin, approve } = require('../controllers/admin-controller')


adminRouter.post('/adminPosts',authenticateToken,getPostsAdmin)
//To APPROVE the post
adminRouter.post('/approve',authenticateToken,approve)
//To DELETE a post , delete comments and likes as middleware


module.exports = adminRouter