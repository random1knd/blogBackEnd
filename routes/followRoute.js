const express = require('express')
const followRouter = express.Router()

const { follower ,notified} = require('../controllers/follow-controller')
const { authenticateToken  } = require('../controllers/jwt-controller')

const {followDetailsValidator} = require('../validationLayer/followDetailsValidator')



//Start of notification section
followRouter.post('/notifications',authenticateToken,notified)
//End of Notification section



//start of follower section 
//To follow a user 
followRouter.post('/follow',followDetailsValidator,authenticateToken,follower)
//End of followe section


module.exports = followRouter