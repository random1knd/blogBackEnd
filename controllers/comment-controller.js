
const blogSchema = require('../schema/blogSchema')
const commentSchema = require('../schema/commentSchema')

//function to post comments on a blog
const comment = async (req,res,next) =>{
    const {blogId,comment} = req.body
  
    
    const data = {
        blogId:blogId,
        madeBy:req.body.user.name,
        comment:comment
        
    }
    const commentSave = new commentSchema(data)
    try{
        await commentSave.save()
        return res.status(201).send({success:true,message:"comment successfully created"})
    }
    catch(err){
        console.log("error occured while saving comment ")
    }
    
    next()
}


//function to delete a individual comment
const commentDelete = async (req,res,next) =>{
   // console.log("this is comment deleter")
    try{
       
    if(!req.body.commentId){
        return res.status(400).send({success:false,message:"Invalid request body"})
    }

    const comment =await commentSchema.findOne({_id:req.body.commentId})
    if(comment ===null){
        return res.status(400).send({success:false,message:"comment  not found"})


    }
    if(comment.madeBy != req.body.user.name){
        return res.status(403).send({seccuess:false,message:"Not authorized"})
    }

    await commentSchema.deleteOne({_id:req.body.commentId})
    return res.status(200).send({success:true,message:"comment successfully deleted"})

    }catch(err){
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
   
    

}



//function to update a comment
const commentUpdate = async (req,res,next) =>{
    
    try{
    //console.log("this is comment updater")
    if(!req.body.commentId){
        return res.status(400).send({success:false,message:"Request body Invalid"})
    }
    const value = req.body.comment
    if(value == "" || value > 300){
        return res.status(413).send({success:false,message:"comment can't be lesser than 1 words and greater than 300 words"})
    }
    const comment =await commentSchema.findOne({_id:req.body.commentId})

    
    
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

    }catch(err){
    
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
     
    }

}

//middleware function to delete comments linked to a post when a post is deleted
const commentsDelete = async (req,res,next) =>{
    
    try{
      
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
        if(comments.length == 0){
            return res.status(404).send({success:true,message:"No comments found"})
        }
        return res.status(200).send({success:true,message:"comments",result:comments})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
}
module.exports = {comment , commentDelete , commentUpdate ,commentsDelete ,comments}