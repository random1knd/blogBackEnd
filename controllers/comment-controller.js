
const commentSchema = require('../schema/commentSchema')
async function comment(req,res,next){
    const {blogId,comment} = req.body
    if(!blogId){
        return res.status(400).send("blog id is required")
    }
    if(!comment){
        return res.status(400).send("comment is required")
    }
    if(comment.length > 300){
        return res.status(400).send("comment can't more than 300 words")
    }
    const data = {
        blogId:blogId,
        madeBy:req.body.user.name,
        comment:comment
        
    }
    const commentSave = new commentSchema(data)
    try{
        await commentSave.save()
    }
    catch(err){
        console.log("error occured while saving comment ")
    }
        res.status(201).send("the comment has been created")
    next()
}

async function commentDelete(req,res,next){
    console.log("this is comment deleter")
    if(!req.body.commentId || req.body.commentId.length != 24){
        return res.status(400).send("comment not found")
    }
    
    const comment =await commentSchema.findOne({_id:req.body.commentId})
    if(comment ===null){
        return res.status(400).send("comment not found")


    }
    if(comment.madeBy != req.body.user.name){
        return res.status(403).send("not authorized")
    }
    await commentSchema.deleteOne({_id:req.body.commentId})
    return res.status(200).send("comment successfully deleted")

}

async function commentUpdate(req,res,next){
    
    console.log("this is comment updater")
    if(!req.body.commentId || req.body.commentId.length != 24){
        return res.status(400).send("request body invalid")
    }
    const value = req.body.comment
    if(value > 300){
        return res.status(413).send("comment can't be greater than 300 words")
    }

    const comment =await commentSchema.findOne({_id:req.body.commentId})
    
    
    if(comment ===null){
        return res.status(404).send("comment not found")


    }
    if(comment.madeBy != req.body.user.name){
        return res.status(403).send("not authorized")
    }

    const commentUpdate = await commentSchema.findOne({_id:req.body.commentId})
  
    commentUpdate.comment = req.body.comment
    await commentUpdate.save()
    
    return res.status(200).send("comment successfully updated")
}


async function commentsDelete(req,res,next){
    
    try{
        if(!req.body.commentId){
            return res.status(400).send("request body not valid")
        }
        await commentSchema.deleteMany({blogId:req.body.blogId})
    }catch(err){
        console.log("some error while deleting the post")
    }
    
    next()
}

async function comments(req,res,next){
    try{
        if(!req.body.blogId){
            return res.status(400).send("request body invalid")
        }
        const comments = await commentSchema.find({blogId:req.body.blogId})
        return res.status(200).send(comments)
    }
    catch(err){

    }
}
module.exports = {comment , commentDelete , commentUpdate ,commentsDelete ,comments}