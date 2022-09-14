const likeSchema = require('../schema/likeSchema')
const comment = require('../schema/commentSchema')
const commentSchema = require('../schema/commentSchema')
const blogSchema = require('../schema/blogSchema')
async function liker(req,res,next){

    try{
    const findLike = await likeSchema.findOne({likedBy:req.body.user.name,object:req.body.object})
    if(findLike===null){
        const data = {
            likedBy:req.body.user.name,
            object:req.body.object
        }
        const liker = new likeSchema(data)
        await liker.save()
        return res.send("liked")
    }else{
        await likeSchema.deleteOne({likedBy:req.body.user.name,object:req.body.object})
        return res.send("like deleted")
    }
}
catch(err){
    console.log('error occured at the liking object')
}
    
}

async function likesDelete(req,res,next){
    if(req.body.blogId >=24){
        return res.status(400).send("Invalid request")
    }
    
    const auth =await blogSchema.findOne({_id:req.body.blogId})
    if(auth == null){
        return res.statu(400).send("post not found")
    }
    if(auth.createdBy != req.body.user.name){
        return res.send("not authorized from likes delete")
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

async function commentLikesDelete(req,res,next){
    try{
        await likeSchema.deleteMany({object:req.body.commentId})
    }catch(err){
        console.log("error comment likes delete")
    }
}

async function likes(req,res,next){
    try{
        if(req.pramas.commentId.length != 24){
            res.send("comment object not found")
        }
        const values =await likeSchema.findMany({object:req.params.commentsId})
        let count=0
        values.forEach(values=>{
            count++
        }) 
        return res.send(count)

    }catch(err){
        console.log()
    }
}
module.exports = { liker, likesDelete, commentLikesDelete ,likes}