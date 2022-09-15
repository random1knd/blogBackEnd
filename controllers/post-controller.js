const blog = require('../schema/blogSchema')
const commentsDelete  = require('../controllers/comment-controller')


const post = async (req,res,next) =>{
    
    const {title,description,blogData}  =req.body
    if(!title){
        return res.status(400).send({success:false,message:"title is required"})
    }
    if(!description){
        return res.status(400).send({success:false,message:"description is required"})
    }
    if(!blogData){
        return res.status(400).send({success:false,message:"post information is required"})
    }

    if(title.length > 200 || description.length > 300 || blogData.length > 2000){
        return res.status(400).send({success:false,message:"make sure title - 200 words, description - 300 words ,post - 2000 words"})
    }

    const data = {
        createdBy:req.body.user.name,
        title:title,
        description:description,
        blogData:blogData
    }
    
    const backend = new blog(data)
    await backend.save()
    
    console.log("this is the middle ware for the blog post ")
    res.status(201).send({success:true,message:"new post has been created"})
    next()
} 




const postDelete = async (req,res,next) =>{
   //console.log("lets see if this is working")
    try{
        
        if(!req.body.blogId.length || req.body.blogId.length !=24){
            return res.status(400).send({success:false,message:"request not valid"})
        }
        const postCreator = await blog.findOne({_id:req.body.blogId})
        if(postCreator == null){
            return res.status(400).send({success:false,message:"post not found"})
        }
        console.log(postCreator.createdBy)
        console.log(req.body.user.name)
        if(postCreator.createdBy != req.body.user.name)
        {
            return res.status(403).send({success:false,message:"not authorized"})


        }
        
        
        await blog.deleteOne({_id:req.body.blogId})
        return res.status(200).send({success:true,message:"succefully deleted the post"})

    }
    catch(err){
        console.log(err)
    }
    
    //res.send('data')
    //res.send("this deltes post")
    next()
}

const postUpdate = async (req,res,next) => {
    //console.log("let's see if this is working postUpdate")
    try{
        if(!req.body.postId || req.body.postId.length != 24){
            return res.status(400).send({success:false,message:"reqeuest body not valid"})
        }
        const post = await blog.findOne({_id:req.body.postId})
        
        if(post == null){
            return res.status(404).send({success:false,message:"post not found"})
        }
        if(post.createdBy != req.body.user.name){
            return res.status(403).send({success:false,message:"not authorized"})
        }
        
        const {title,blogData,description} = req.body

        
      
    
        if(title.length > 200 || description.length > 300 || blogData.length > 2000){
            return res.status(400).send({success:false,message:"make sure title - 200 words, description - 300 words ,post - 2000 words"})
        }
    



        post.blogData = blogData
        post.title = title
        post.description = description

        post.save()
        console.log(post)
        return res.status(200).send({success:true,message:"post updated successfully"})
    }catch(err){
        console.log(err)
    }
    
   
    next()
}

const getPosts = async (req,res,next) =>{
    const posts = await blog.find()
    if(posts.length == 0){
        return res.status(404).send({success:false,message:"posts not found"})
    }
    res.status(200).send({success:true,message:posts})
}

const getSinglePost = async (req,res,next) =>{
    // console.log("lets see if this is working")
    if(!req.params.id || req.params.id != 24){
        return res.staus(400).send({success:false,message:"Invalid request"})
    }
    try{
    const post = await blog.findById({_id:req.params.id})
    const something = "value"
    
    return res.status(200).send({success:true,message:post})
    }catch(err){
        return res.status(400).send({success:true,message:"something went wrong"})
        console.log(err)
    }
    next()
}

module.exports = {post , postDelete, postUpdate , getPosts , getSinglePost}