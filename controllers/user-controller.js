const express = require('express')
const userSchema = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSchema = require('../schema/tokenSchema')
const {secretKeySchema} = require('../schema/secretKeysSchema')

const register = async (req,res,next) =>{
    try{
    const { user, password,description,email} = req.body
    if(!user || user ==""){
        return res.status(400).send({success:false,message:'username is required'})
        //return res.status(400).send({success:false,message:"username is required"})
    }
    if(!password || password.length < 7 || password==""){
        return res.status(400).send({success:false,message:"password is required and with the right length min 7 characters"})
    }
    if(!description || description ==""){
        return res.status(400).send({success:false,message:"description is required"})
    }
    if(!email || email ==""){
        return res.status(400).send({success:false,message:"email is required"})
    }
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex)){

        
        return res.status(400).send({success:false,message:"Input valid emailid"})
    }
    if(await userSchema.findOne({email:email})!=null){return res.status(400).send({success:false,message:"email already exists"})}
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
    return res.status(400).send({success:false,message:"user could not be created try changing the user name and make sure your email id is proper"})
}
return res.status(201).send({success:true,message:"user has been created"})

}

const login = async (req,res,next) =>{
    if(!req.body.user || !req.body.password){
        return res.status(400).send({success:false,message:"both username and password are required"})
    }
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
    const value = await jwt.sign(req.body.user.name,process.env.REFRESH_TOKEN)
    console.log(value)
    await tokenSchema.deleteMany({token:value})
    return res.status(200).send("successfully loggedout")
    next()
}

module.exports = {register , login, logout   ,generateAccessToken}