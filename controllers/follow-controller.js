const followSchema = require('../schema/followSchema')
const notificationSchema = require('../schema/notificationSchema')
const userSchema = require('../schema/userSchema')
async function follower(req,res,next){
    
    const user = userSchema.findOne({user:req.body.follow})
    if(user== null){
        return res.send("user not found")
    }
    const value = await followSchema.findOne({followedBy:req.body.user.name,following:req.body.follow})
    console.log(value)
    if(value != null){
        await followSchema.deleteOne({followedBy:req.body.user.name,following:req.body.follow})
        return res.send("unfollowed successfully")
    }
    const follow= new followSchema({followedBy:req.body.user.name,following:req.body.follow})
    await follow.save()
    res.send("following successfull")
}

//section of code to push onto notifier when new articles is published by user 
async function notification(req,res,next){
    
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
async function notified(req,res,next){
    console.log("let's see if this works")
    const notifications =await notificationSchema.find({updateFor:req.body.user.name})
    if(notifications == []){
        return res.send("not notifications here")
    } 
    
    res.send(notifications)
    await notificationSchema.deleteMany({updateFor:req.body.user.name})
}

module.exports = {follower,notification , notified}