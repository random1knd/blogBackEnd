const express = require('express')
const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSchema = require('../schema/tokenSchema')
async function register(req,res,next){
    try{
    const details = {
        user:req.body.user,
        password:await bcrypt.hash(req.body.password,10),
        description:req.body.description,
        email:req.body.email
    }
    const user = new userSchema(details)
    await user.save()
}catch(err){
    return res.send("user could not be created try changing the user name")
}
res.send("user has been created")
    next()

}

async function login(req,res,next){
    const user = req.body.user
   try{
    const value =  await userSchema.find({user:user})
    
    if (value.length == 0){
        return res.send("username not found")
    }
    const password =await userSchema.find({user:user})
    console.log(password[0].password)
    if(!await bcrypt.compare(req.body.password,password[0].password)){
        return res.send("password does not match")
    }
    const username = {name:user}
    const accessToken = generateAccessToken(username)
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN)
    
    const token  = new tokenSchema({token:refreshToken})
    await token.save()
    res.json({accessToken:accessToken,refreshToken:refreshToken})
}catch(err){

}
    next()
}


function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'20s'})
}
async function createNewToken(req,res,next){
    
    const refreshToken = req.body.token
    if(refreshToken == null) return res.send("not found")
    if(await tokenSchema.find({token:refreshToken}) == []){
        return res("not found")
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
    req.user = user
    next()
})
    
}






function logout(req,res,next){
    console.log("the user has logged out")
    res.send("the user has logged out the middle ware")
    next()
}

module.exports = {register , login, logout , authenticateToken , createNewToken}