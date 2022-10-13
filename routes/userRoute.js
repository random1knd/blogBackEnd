const express = require('express')
const userRouter = express.Router()
const {register,login, logout} = require('../controllers/user-controller')

const { authenticateToken  } = require('../controllers/jwt-controller')

const {registerValidate,loginValidate} = require('../validationLayer/userDetailsvalidaton')


userRouter.post('/register',registerValidate,register)


userRouter.post('/login',loginValidate,login,(req,res)=>{
    console.log("after going through login")
    
   
})


userRouter.post('/logout',authenticateToken,logout)

module.exports = userRouter