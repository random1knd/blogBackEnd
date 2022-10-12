const followSchema = require('../schema/followSchema')
const notificationSchema = require('../schema/notificationSchema')
const userSchema = require('../schema/userSchema')

//function to follow a user -- checks if the user is already following the user if not pushes to the follow collection as followedBy:followed, if already exists in  followed deletes from the follow collection(unfollows)
const follower = async (req,res,next) =>{
    // if(!req.body.follow){
    //     return res.status(400).send({success:false,message:"Invalid request body"})
    // }
    // const user = await userSchema.findOne({user:req.body.follow})
    // if(user== null){
    //     return res.status(400).send({success:false,message:"user not found"})
    // }
    const value = await followSchema.findOne({followedBy:req.body.user.name,following:req.body.follow})
    console.log(value)
    if(value != null){
        await followSchema.deleteOne({followedBy:req.body.user.name,following:req.body.follow})
        return res.status(200).send({success:true,message:"unfollowed successfully"})
    }
    const follow= new followSchema({followedBy:req.body.user.name,following:req.body.follow})
    await follow.save()
    res.status(201).send({success:true,message:"following successfull"})
}

//section of code to push onto notifier when new articles is published by user 
const notification = async (req,res,next) =>{
    
    const follow =await followSchema.find({following:req.body.user.name})
    console.log(follow)
    follow.forEach(async follow=>{
        if(follow.following == req.body.user.name){
            let s = new notificationSchema({updateFor:follow.followedBy,updateTitle:req.body.title,updateFrom:req.body.user.name})
            await s.save()
        }
    })
   
}
//Section of code to send notifications
const notified = async (req,res,next) =>{
   // console.log("let's see if this works")
   try{
    const notifications =await notificationSchema.find({updateFor:req.body.user.name})
    if(notifications == []){
        return res.status(200).send({success:true,message:"no notifications here"})
    } 
    
    res.status(200).send({success:true,message:"notifications",result:notifications})
    await notificationSchema.deleteMany({updateFor:req.body.user.name})
}catch(err){
    console.log(err)
    return res.status(403).send({success:false,message:"something went wrong"})
}
}

module.exports = {follower,notification , notified}