const express = require('express')
const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSchema = require('../schema/tokenSchema')
const {secretKeySchema} = require('../schema/secretKeysSchema')
async function register(req,res,next){
    try{
    const { user, password,description,email} = req.body
    if(!user){
        return res.send("username is required")
    }
    if(!password || password.legnt < 7){
        return res.send("password is required and with the right length")
    }
    if(!description){
        return res.send("description is required")
    }
    if(!email){
        return res.send("email is required")
    }
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex)){
        return res.send("input valid emaild id")
    }
    const details = {
        user:user,
        password:await bcrypt.hash(password,10),
        description:description,
        email:email
    }
    const userSave = new userSchema(details)
    await userSave.save()
}catch(err){
    console.log(err)
    return res.send("user could not be created try changing the user name and make sure your email id is proper")
}
return res.send("user has been created")

}

async function login(req,res,next){
    if(!req.body.user || !req.body.password){
        return res.send("both username and password are required for login")
    }
    const user = req.body.user
   try{
    const value =  await userSchema.findOne({user:user})
    
    if (value === null){
        return res.send("username not found")
    }
    const password =await userSchema.findOne({user:user})
    
    if(!await bcrypt.compare(req.body.password,password)){
        return res.send("password does not match")
    }
    const username = {name:user}
    

    const accessToken = generateAccessToken(username)

    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN)
    
    const token  = new tokenSchema({token:refreshToken})
    await token.save()
    res.json({accessToken:accessToken,refreshToken:refreshToken})
}catch(err){
    console.log(err)
}
    next()
}


function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'30m'})
}
async function createNewToken(req,res,next){
    
    const refreshToken = req.body.token
    if(refreshToken == null) return res.send("not found")
    if(await tokenSchema.find({token:refreshToken}) == []){
        return res.send("not found")
    }
    
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
        if (err) return res.send("not authentic token")
        const newAccessToken = generateAccessToken({name:user.name})
        res.send(newAccessToken)
        next()
    })

}

async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    
    
    
   const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.send("token not found")
   
   jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if (err)
    {
    return res.send("not authentic")
    }
    req.body.user = user
    next()
})
    
}






async function logout(req,res,next){
    const value = await jwt.sign(req.body.user.name,process.env.REFRESH_TOKEN)
    console.log(value)
    await tokenSchema.deleteMany({token:value})
    return res.send("successfully loggedout")
    next()
}

module.exports = {register , login, logout , authenticateToken , createNewToken}