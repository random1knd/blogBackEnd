const express = require('express')
const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSchema = require('../schema/tokenSchema')
const {secretKeySchema} = require('../schema/secretKeysSchema')


//resgiser -- requires user, passwrod, description, email from body
//Throws error if either of them are missing
//Throws error if the username already exists
//Throws error if the email already exists
//Throws error if the email is not valid
//Throws error if the password length is not more than 7 words 
const register = async (req,res,next) =>{
    try{
    const { user, password,description,email} = req.body
 
    
    
    const details = {
        user:user,
        password:await bcrypt.hash(password,10),
        description:description,
        email:email
    }
    const userSave = new userSchema(details)
    await userSave.save()
    return res.status(201).send({success:true,message:"user has been created"})
}catch(err){
    console.log(err)
    return res.status(400).send({success:false,message:"user could not be created try changing the user name and make sure your email id is proper"})
}

}
//login -- requires user and password from body throws error if either of them not found
//throws error if credentials are present but username is not found in the db
//Throws error if the username exsits but password doesn't match
//Sends access and refresh token when username and password matches 
const login = async (req,res,next) =>{
    
    const user = req.body.user
   try{
    const value =  await userSchema.findOne({user:user})
    const role = value.role
    if (value === null){
        return res.status(404).send({success:false,message:"username not found"})
    }
    const password = await userSchema.findOne({user:user})
   
    if(!await bcrypt.compare(req.body.password,password.password)){
        return res.status(403).send({success:false,message:"password does not match"})
    }
    const username = {name:user,role:role}
    

    const accessToken = generateAccessToken(username)

    const refreshToken = jwt.sign(username,process.env.REFRESH_TOKEN)
    
    const token  = new tokenSchema({token:refreshToken})
    await token.save()
    res.status(200).send({success:true,message:"logged in",accessToken:accessToken,refreshToken:refreshToken})
}catch(err){
    console.log(err)
}
    next()
}

// this user argument contains {name:"",role:""}
//Generates access token
function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'60m'})
}








async function logout(req,res,next){
    const value =  jwt.sign(req.body.user.name,process.env.REFRESH_TOKEN)
    //console.log(value)
    await tokenSchema.deleteMany({token:value})
    return res.status(200).send("successfully loggedout")
    next()
}

module.exports = {register , login, logout   ,generateAccessToken}