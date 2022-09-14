
const commentSchema = require('../schema/commentSchema')
async function comment(req,res,next){
    const {blogId,comment} = req.body
    if(!blogId){
        return res.send("blog id is required")
    }
    if(!comment){
        return res.send("comment is required")
    }
    if(comment.length > 300){
        return res.send("comment can't more than 300 words")
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
        res.send("the comment has been created")
    next()
}

async function commentDelete(req,res,next){
    console.log("this is comment deleter")
    if(req.body.commentId.length != 24){
        return res.send("comment not found")
    }
    
    const comment =await commentSchema.findOne({_id:req.body.commentId})
    if(comment ===null){
        return res.send("comment not found")


    }
    if(comment.madeBy != req.body.user.name){
        return res.send("not authorized")
    }
    await commentSchema.deleteOne({_id:req.body.commentId})
    return res.send("comment successfully deleted")

}

async function commentUpdate(req,res,next){
    
    console.log("this is comment updater")
    if(req.body.commentId.length != 24){
        return res.send("comment not found")
    }
    const value = req.body.comment
    if(value > 300){
        return res.send("comment can't be greater than 300 words")
    }

    const comment =await commentSchema.findOne({_id:req.body.commentId})
    
    
    if(comment ===null){
        return res.send("comment not found")


    }
    if(comment.madeBy != req.body.user.name){
        return res.send("not authorized")
    }

    const commentUpdate = await commentSchema.findOne({_id:req.body.commentId})
  
    commentUpdate.comment = req.body.comment
    await commentUpdate.save()
    
    return res.send("comment successfully updated")
}


async function commentsDelete(req,res,next){
    
    try{
        await commentSchema.deleteMany({blogId:req.body.blogId})
    }catch(err){
        console.log("some error while deleting the post")
    }
    
    next()
}

module.exports = {comment , commentDelete , commentUpdate ,commentsDelete}