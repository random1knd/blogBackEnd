
const commentSchema = require('../schema/commentSchema')
async function comment(req,res,next){
    const data = {
        blogId:req.body.blogId,
        madeBy:req.body.madeBy,
        comment:req.body.comment,
        
    }
    const comment = new commentSchema(data)
    try{
        await comment.save()
    }
    catch(err){
        console.log("error occured while saving comment ")
    }
        res.send("the comment has been created")
    next()
}

async function commentsDelete(req,res,next){
    try{
        const deleteComments = await commentSchema.deleteMany({blogId:req.body.blogId})

    }
    catch(err){
        console.log("error occured while deleting the comments")
    }



    next()
}

async function singleCommentDelete(req,res,next){
    try{
        await commentSchema.deleteOne({_id:req.body.commentId})
    }
    catch(err){
        console.log("failed to delete individual comment")
    }

}

async function getPostComments(req,res,next){
    try{
        const comments = await commentSchema.find()
        console.log(comments)
        //res.body.comments = {comments}
        
    }
    catch(err){
        console.log("something went wrong")
    }
next()
}
module.exports = {comment, commentsDelete ,singleCommentDelete ,getPostComments}