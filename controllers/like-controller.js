const likeSchema = require('../schema/likeSchema')
const comment = require('../schema/commentSchema')
const commentSchema = require('../schema/commentSchema')
const blogSchema = require('../schema/blogSchema')
const liker = async (req,res,next) =>{

    try{
        if(!req.body.object){
            return res.status(400).send({success:false,message:"invalid request  body"})
        }
        
        const findComment = await commentSchema.findOne({_id:req.body.object})
        if(findComment == null){
            return res.status(400).send({success:false,message:"comment not found"})
        }

    const findLike = await likeSchema.findOne({likedBy:req.body.user.name,object:req.body.object})
    if(findLike===null){
        const data = {
            likedBy:req.body.user.name,
            object:req.body.object
        }
        const liker = new likeSchema(data)
        await liker.save()
        return res.status(201).send({success:true,message:"liked"})
    }else{
        await likeSchema.deleteOne({likedBy:req.body.user.name,object:req.body.object})
        return res.status(200).send({success:true,message:"like deleted"})
    }
}
catch(err){
    console.log('error occured at the liking object')
    return res.status(400).send({success:false,message:"something went wrong make sure the id is right "})
}
    
}

const likesDelete = async (req,res,next) =>{
    if(!req.body.blogId){
        return res.status(400).send({success:false,message:"Invalid request"})
    }
    try{
    const auth =await blogSchema.findOne({_id:req.body.blogId})
    
            
    if(auth == null){
        return res.statu(404).send({success:false,message:"post not found"})
    }
    if(auth.createdBy != req.body.user.name){
        return res.status(403).send({success:false,message:"not authorized user"})
    }


    const comments =await commentSchema.find({blogId:req.body.blogId})
    if(comments.length ==0){
        return next()
    }
    console.log("this won't show up ")
    console.log(comments)
    comments.forEach(c=>{
        console.log(c._id)
    })
    comments.forEach(async c =>{
        await likeSchema.deleteMany({object:c._id})
    })
}catch(err){
    return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
}
    
   next()
}

const commentLikesDelete = async (req,res,next) =>{
    try{
        if(!req.body.commentId){
            return res.status(400).send({success:false,message:"Invalid request body"})
        }
        await likeSchema.deleteMany({object:req.body.commentId})
    }catch(err){
        console.log("error comment likes delete")
        
    }
    next()
}

const likes = async (req,res,next) =>{
    try{
        if(!req.body.commentId){
            return res.status(400).send({success:false,message:"Invalid request body"})
        }
      
        const values =await likeSchema.find({object:req.body.commentId})
        console.log(values.length,values)
        if(values.length == 0){
            return res.status(404).send({success:false,message:"object not found"})
        }
        let count=0
        values.forEach(values=>{
            count++
        }) 
        return res.status(200).send({success:true,message:"likes",result:count})

    }catch(err){
        console.log()
        return res.staus.send({success:false,message:"something went wrong make sure the id is right"})
    }
}
module.exports = { liker, likesDelete, commentLikesDelete ,likes}