
const blogSchema = require('../schema/blogSchema')
const commentSchema = require('../schema/commentSchema')
const comment = async (req,res,next) =>{
    const {blogId,comment} = req.body
    if(!blogId || blogId ==""){
        return res.status(400).send({success:false,message:"blog id is required"})
    }
    if(!comment || comment==""){
        return res.status(400).send({success:false,message:"comment is required"})
    }
    if(comment.length > 300){
        return res.status(413).send({success:false,message:"comment can't more than 300 words"})
    }
    //Checks if the post with the id exists
    try{

    const exist =await blogSchema.findOne({_id:blogId})
    if(exist == null){
        return res.status(400).send({success:false,message:"post not found"})
    }
    }
    catch(err){
        //Throws error if the blogId is not according to mongodb
        console.log(err)

        return res.status(400).send({success:false,message:"something went wrong"})
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
        res.status(201).send({success:true,message:"comment successfully created"})
    next()
}

const commentDelete = async (req,res,next) =>{
    console.log("this is comment deleter")
    if(!req.body.commentId){
        return res.status(400).send({success:false,message:"Invalid request body"})
    }
    try{
    const comment =await commentSchema.findOne({_id:req.body.commentId})
    if(comment ===null){
        return res.status(400).send({success:false,message:"comment  not found"})


    }
    }catch(err){
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
    if(comment.madeBy != req.body.user.name){
        return res.status(403).send({seccuess:false,message:"Not authorized"})
    }
    await commentSchema.deleteOne({_id:req.body.commentId})
    return res.status(200).send({success:true,message:"comment successfully deleted"})

}

const commentUpdate = async (req,res,next) =>{
    
    console.log("this is comment updater")
    if(!req.body.commentId){
        return res.status(400).send({success:false,message:"Request body Invalid"})
    }
    const value = req.body.comment
    if(value == "" || value > 300){
        return res.status(413).send({success:false,message:"comment can't be lesser than 1 words and greater than 300 words"})
    }
    try{
    const comment =await commentSchema.findOne({_id:req.body.commentId})

    }catch(err){
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right "})
    }
    
    if(comment ===null){
        return res.status(404).send({success:false,message:"comment not found"})


    }
    if(comment.madeBy != req.body.user.name){
        return res.status(403).send({success:false,message:"Not authorized"})
    }

    const commentUpdate = await commentSchema.findOne({_id:req.body.commentId})
  
    commentUpdate.comment = req.body.comment
    await commentUpdate.save()
    
    return res.status(200).send({success:true,message:"comment successfully updated"})
}


const commentsDelete = async (req,res,next) =>{
    
    try{
        if(!req.body.commentId){
            return res.status(400).send({success:false,message:"request body not valid"})
        }
        await commentSchema.deleteMany({blogId:req.body.blogId})
    }catch(err){
        console.log("some error while deleting the post")
        return res.status(400).send({success:false,message:"some error occured deleting the comment"})
    }
    
    next()
}

//Fetches the comments linked to a blog
const comments = async (req,res,next) =>{
    try{
        if(!req.body.blogId){
            return res.status(400).send({success:false,message:"request body invalid"})
        }
        const comments = await commentSchema.find({blogId:req.body.blogId})
        return res.status(200).send({success:true,message:comments})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
}
module.exports = {comment , commentDelete , commentUpdate ,commentsDelete ,comments}