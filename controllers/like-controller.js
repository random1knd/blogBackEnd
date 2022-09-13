const likeSchema = require('../schema/likeSchema')
const comment = require('../schema/commentSchema')
const commentSchema = require('../schema/commentSchema')
async function liker(req,res,next){
    const data = {
        likedBy:req.body.likedBy,
        object:req.body.object
    }
    const liker = new likeSchema(data)
    try{
    await liker.save()
    }
    catch(err){
        console.log("error occured while saving like")
    }
    res.send("the object has been liked")
}

async function likesDelete(req,res,next){
    const comments = await comment().find({_id:req.body.blogId})
    comments.forEach(async c =>{
        await likeSchema().deleteMany({object:c_.id})
    })
    console.log("deleted all the likes")
    next()

}

async function commentLikesDelete(req,res,next){
    try{
        const del = req.body.commentId
        await likeSchema.deleteMany({object:del})
    }
    catch(err){
        console.log("some error occured while deleting the likes of individual comment")
    }
    next()
}

async function singleLikeDelete(req,res,next){
    console.log("let's see if this appears")
    try{
        await likeSchema.deleteOne({_id:req.body.likeId})
    }
    catch(err){
        console.log("some err occured was unable to delete single like")
    }
    next()
}

async function getCommentLikes(req,res,next){
    
    try{
        const likes =await  likeSchema.find({object:req.body.id})
        console.log(likes.length) 
        
    }
    catch(err){
        console.log("some error occured while brining likes")
    }
    next()
}
module.exports = { liker, likesDelete , commentLikesDelete, singleLikeDelete ,getCommentLikes}