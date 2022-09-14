
const commentSchema = require('../schema/commentSchema')
async function comment(req,res,next){
    const data = {
        blogId:req.body.blogId,
        madeBy:req.body.user.name,
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


module.exports = {comment , commentDelete , commentUpdate}