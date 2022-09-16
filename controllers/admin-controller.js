const blogSchema = require('../schema/blogSchema')

const getPostsAdmin = async (req,res,next) =>{
    //Checks if the user is admin or not 
    if(req.body.user.role != "admin"){
        return res.status(403).send({success:false,message:"Not authorized"})

    }
    //Check for all the posts which are pending
    const posts = await blogSchema.find({staus:"Pending"})
    if(posts.length ==0){
        //If no posts are found
        return res.status(200).send({success:true,message:"No posts are pending"})
    }

    //If posts found sends them
    return res.status(200).send({success:true,message:posts})
}

const approve = async (req,res,next) =>{
    //To check if the blogId has been provided and it it is empty
    if(!req.body.blogId || req.body.blogId ==""){
        //return Invalid request body if the condition satisfies
        return res.status(400).send({success:false,message:"Invalid request body"})
    }
    //Checks if the role of the user is admin or not 
    if(req.body.user.role !="admin"){
        //returns not authorized if the user is not admin
        return res.status(403).send({success:false,message:"Not authorized"})

    }
    try{
        //Finds if the post with the given blogId exists or not
        const post =await blogSchema.findOne({_id:req.body.blogId})
        if(post == null){
            //returns false if post is not found
            return res.status(400).send({success:false,message:"Post not found"})
        }
        //If passes through all the checks changes the status to approve and saves it 
        post.status = "Approved"
        post.save()
        return res.status(201).send({success:true,message:"Post successfully approved"})
    }catch(err){
        //If the post id is not according to mongodb length catches the error 
        console.log(err)
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right "})
    }
    
    return res.status(400).send({success:false,message:"something went wrong try later"})
}

module.exports = { getPostsAdmin ,approve}