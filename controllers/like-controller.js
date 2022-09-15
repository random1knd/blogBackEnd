const likeSchema = require('../schema/likeSchema')
const comment = require('../schema/commentSchema')
const commentSchema = require('../schema/commentSchema')
const blogSchema = require('../schema/blogSchema')
const liker = async (req,res,next) =>{

    try{
        if(!req.body.object){
            return res.status(400).send("invalid request  body")
        }
        if(req.body.object !=24){
            return res.status(400).send({success:false,message:"Invalid request body"})
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
        return res.status(201).send("liked")
    }else{
        await likeSchema.deleteOne({likedBy:req.body.user.name,object:req.body.object})
        return res.status(200).send({success:false,message:"like deleted"})
    }
}
catch(err){
    console.log('error occured at the liking object')
}
    
}

const likesDelete = async (req,res,next) =>{
    if(!req.body.blogId || req.body.blogId !=24){
        return res.status(400).send({success:false,message:"Invalid request"})
    }
    
    const auth =await blogSchema.findOne({_id:req.body.blogId})
    if(auth == null){
        return res.statu(400).send({success:false,message:"post not found"})
    }
    if(auth.createdBy != req.body.user.name){
        return res.send({success:false,message:"not authorized from likes delete"})
    }


    const comments =await commentSchema.find({blogId:req.body.blogId})
    
    
    console.log(comments)
    comments.forEach(c=>{
        console.log(c._id)
    })
    comments.forEach(async c =>{
        await likeSchema.deleteMany({object:c._id})
    })
    
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
}

const likes = async (req,res,next) =>{
    try{
        if(!req.params.commentId){
            return res.status(400).send({success:false,message:"Invalid request body"})
        }
        if(req.pramas.commentId.length != 24){
            res.status(400).send({success:false,message:"Invalid request body"})
        }
        const values =await likeSchema.find({object:req.params.commentsId})
        if(values == []){
            return res.status.send({success:false,message:"object not found"})
        }
        let count=0
        values.forEach(values=>{
            count++
        }) 
        return res.status(200).send(count)

    }catch(err){
        console.log()
    }
}
module.exports = { liker, likesDelete, commentLikesDelete ,likes}